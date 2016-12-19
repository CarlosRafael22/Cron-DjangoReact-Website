from django.contrib import admin
from .models import Ingrediente, Receita, Passo_da_Receita, Parte_da_Receita, Foto_Receita

# Register your models here.
admin.site.register(Ingrediente)
admin.site.register(Receita)
admin.site.register(Passo_da_Receita)
admin.site.register(Parte_da_Receita)
admin.site.register(Foto_Receita)