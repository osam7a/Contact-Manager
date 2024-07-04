from django.db import models
from django.utils.translation import gettext_lazy as _

class Source(models.Model): # Approx. 0.02 GB per 1 million records
    source_type = models.CharField(default="manual", max_length=100)
    name = models.CharField(default=_("Manually Added"), max_length=100)
    description = models.TextField(default=_("This contact was manually added to the database."))

    def __str__(self):
        return self.name

class Method(models.Model): # Approx. 0.02 GB per 1 million records
    method_type = models.CharField(default="manual", max_length=100)
    name = models.CharField(default=_("Manually Added"), max_length=100)
    description = models.TextField(default=_("This contact was manually added to the database."))

    def __str__(self):
        return self.name

class Contact(models.Model): # Approx. 8.02 GB per 1 million records
    created_at = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=100, blank=True, help_text=_("The first name of the contact."))
    last_name = models.CharField(max_length=100, blank=True, help_text=_("The last name of the contact."))
    email = models.EmailField(unique=True, help_text=_("The email address of the contact."))
    company = models.CharField(max_length=100, blank=True, help_text=_("The company of the contact."))
    address = models.CharField(max_length=255, blank=True, help_text=_("The address of the contact."))
    title = models.CharField(max_length=5, blank=True, help_text=_("The title of the contact."))
    phone = models.CharField(max_length=20, blank=True, help_text=_("The phone number of the contact."))
    birthday = models.DateField(blank=True, null=True, help_text=_("The birthday of the contact."))

    last_sent = models.DateTimeField(blank=True, null=True, help_text=_("The last time a message was sent to the contact."))
    subscribed = models.BooleanField(default=True, help_text=_("Whether the contact is subscribed or not."))
    source = models.CharField(blank=True, max_length=255, help_text=_("The source of the contact."))
    method = models.ForeignKey(Method, on_delete=models.CASCADE, null=True, help_text=_("The method used to add the contact."))
    tags = models.CharField(help_text=_("Any tags you want for this contact seperated by commas."), blank=True, max_length=255)