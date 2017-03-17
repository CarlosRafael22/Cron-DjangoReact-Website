from django.contrib import admin
from .models import (Ingrediente, Receita, Passo_da_Receita, Parte_da_Receita, Foto_Receita, Perfil, Paciente, Coach, 
	Ordem_Passo_na_Parte_Receita, Chat, Grupo, Foto_Perfil, Log_Peso, Porcao, Refeicao, Log_Refeicao, Diario_Alimentar)
from simple_history.admin import SimpleHistoryAdmin

class LogInline(admin.TabularInline):
	model = Log_Refeicao

class Diario_AlimentarAdmin(admin.ModelAdmin):
    model = Diario_Alimentar
    fields = ['participante']
    inlines = [LogInline]

    def get_logs_refeicoes(self, obj):
        return obj.logs_refeicoes.all()
    get_logs_refeicoes.short_description = 'Logs Refeicoes'  #Renames column head

    #Filtering on side - for some reason, this works
    #list_filter = ['title', 'author__name']

# admin.site.register(Book, BookAdmin)

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
admin.site.register(Log_Peso, SimpleHistoryAdmin)
admin.site.register(Porcao)
admin.site.register(Refeicao)
admin.site.register(Log_Refeicao)
admin.site.register(Diario_Alimentar, Diario_AlimentarAdmin)