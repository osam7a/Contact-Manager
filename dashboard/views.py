from copy import deepcopy
from datetime import timedelta

from django.shortcuts import render
from django.utils import timezone

from .paginator import Paginator
from apps.common.models import Contact

base_context = {
    'name': "I-Trust Systems",
}

PAGE_SIZE = 13

def index(request):
    context = deepcopy(base_context)
    context['contacts'] = Contact.objects.all()
    context['new_contacts'] = Contact.objects.filter(created_at__gte=timezone.now()-timedelta(days=7))
    try:
        context['new_contacts_percentage'] = len(context['new_contacts']) / len(context['contacts']) * 100
    except ZeroDivisionError:
        context['new_contacts_percentage'] = 0

    return render(request, 'index.html', context)

def contacts(request):
    paginator = Paginator(PAGE_SIZE, Contact.objects.all())
    page = request.GET.get('p', 1)
    paginated_contacts = paginator.get_page(int(page))

    context = deepcopy(base_context)
    context['contacts'] = paginated_contacts
    context['total_contacts'] = Contact.objects.count()
    context['pages_count'] = paginator.get_num_pages()

    return render(request, 'pages/contacts.html', context)