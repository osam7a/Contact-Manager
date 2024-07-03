from django.shortcuts import render
from django.http import HttpResponse

def read_file(request):
    # Get any files in request.FILES, read by text and return as HttpResponse
    res = []
    for f in request.FILES:
        res.append(request.FILES[f].read().decode())

    return HttpResponse(res, status=200)