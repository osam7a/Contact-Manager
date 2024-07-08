from copy import deepcopy
from datetime import timedelta

from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone
from django.http import HttpResponse

from .paginator import Paginator
from .forms import ContactForm
from apps.common.models import Contact, Method

base_context = {
    'name': "Contact Manager",
}

PAGE_SIZE = 13

def index(request):
    context = deepcopy(base_context)
    context['contacts'] = Contact.objects.all()
    try:
        context['new_contacts'] = Contact.objects.filter(created_at__gte=timezone.now()-timedelta(days=7))
        context['new_contacts_percentage'] = len(context['new_contacts']) / len(context['contacts']) * 100
    except ZeroDivisionError:
        context['new_contacts'] = 0
        context['new_contacts_percentage'] = 0

    return render(request, 'index.html', context)

# Contacts
def contacts(request):
    paginator = Paginator(PAGE_SIZE, Contact.objects.all())
    page = request.GET.get('p', 1)
    paginated_contacts = paginator.get_page(int(page))

    context = deepcopy(base_context)
    context['contacts'] = paginated_contacts
    context['total_contacts'] = Contact.objects.count()
    context['pages_count'] = paginator.get_num_pages()
    context['contact_form'] = ContactForm()

    if request.GET.get('error') and request.GET.get('message'):
        context['message'] = ("Error" if bool(int(request.GET.get('error'))) else "Success", request.GET.get('message'))

    return render(request, 'pages/contacts.html', context)

def contacts_action(request):
    action_type = request.POST.get('action')
    target = request.POST.getlist('target[]')
    print(f"Action: {action_type}, Target Count: {len(target)}")
    
    if isinstance(target, list) and target[0] == 'all': target = Contact.objects.all()
    elif isinstance(target, list): target = Contact.objects.filter(id__in=target)
    else: target = Contact.objects.get(id=target)

    if action_type == 'delete':
        target.delete()
    elif action_type == 'edit':
        pass

    return HttpResponse("Action successful", status=200)

def contacts_create(request):
    data = {k: v for k, v in request.POST.dict().items() if v}
    del data['csrfmiddlewaretoken']
    for key in data:
        if not data[key]: del data[key]
        if data[key] in ("on","off"): data[key] = data[key] == "on"
    
    method = Method.objects.create()
    method.save()
    try: 
        contact = Contact.objects.update_or_create(**data, method=method)
        contact = contact[0]
    except Exception as e:
        return redirect(reverse('contacts') + f'?error=1&message={e}')

    paginator = Paginator(PAGE_SIZE, list(Contact.objects.all()))
    page = paginator.find(contact)

    return redirect(reverse('contacts') + f'?p={page}&spot=contact-{contact.id}&error=0&message=Contact {contact.first_name} {contact.last_name} created successfully')