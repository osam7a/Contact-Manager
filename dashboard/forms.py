from django import forms

from apps.common.models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = '__all__'
        exclude = ('method',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'border border-neutral-400 bg-neutral-100 w-full p-0.5 px-1 placeholder-gray-400'})