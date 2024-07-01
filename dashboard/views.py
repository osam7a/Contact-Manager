from django.shortcuts import render

base_context = {
    'name': "I-Trust Systems",
}

def index(request):
    return render(request, 'index.html', base_context)

def contacts(request):
    return render(request, 'pages/contacts.html', base_context)