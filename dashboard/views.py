from django.shortcuts import render

base_context = {
    'name': "I-Trust Systems",
}

# Create your views here.
def index(request):
    return render(request, 'index.html', base_context)