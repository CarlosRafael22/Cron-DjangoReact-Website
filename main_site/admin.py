from django.contrib import admin
from .models import (Ingrediente, Receita, Passo_da_Receita, Parte_da_Receita, Foto_Receita, Perfil, Paciente, Coach, Ordem_Passo_na_Parte_Receita, Chat, Grupo, Foto_Perfil)

# Register your models here.
admin.site.register(Ingrediente)
admin.site.register(Receita)
admin.site.register(Passo_da_Receita)
admin.site.register(Parte_da_Receita)
admin.site.register(Foto_Receita)
admin.site.register(Perfil)
admin.site.register(Paciente)
admin.site.register(Coach)
admin.site.register(Ordem_Passo_na_Parte_Receita)
admin.site.register(Chat)
admin.site.register(Grupo)
admin.site.register(Foto_Perfil)