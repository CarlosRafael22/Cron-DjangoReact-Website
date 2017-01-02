from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from main_site import views

urlpatterns = [
	# url(r'^ingredientes/$', views.ingrediente_list),
	# url(r'^ingredientes/(?P<pk>[0-9]+)/$', views.ingrediente_detail),
	# url(r'^receitas/$', views.receita_list),
	# url(r'^receitas/(?P<pk>[0-9]+)/$', views.receita_detail),
	#url(r'^api/ingredientes/$', views.IngredienteList.as_view()),
	url(r'^api/ingredientes/$', views.ingrediente_list),
	url(r'^api/ingredientes/(?P<pk>[0-9]+)/$', views.IngredienteDetail.as_view()),
	url(r'^api/passos_receitas/$', views.Passo_da_ReceitaList.as_view()),
	url(r'^api/passos_receitas/(?P<pk>[0-9]+)/$', views.Passo_da_ReceitaDetail.as_view()),
	#url(r'^api/partes_receitas/$', views.Parte_da_ReceitaList.as_view()),
	url(r'^api/partes_receitas/$', views.parte_receita_list),
	url(r'^api/partes_receitas/(?P<pk>[0-9]+)/$', views.Parte_da_ReceitaDetail.as_view()),
	#url(r'^api/receitas/$', views.ReceitaList.as_view()),
	url(r'^api/receitas/$', views.receita_list),
	url(r'^api/receitas/(?P<pk>[0-9]+)/$', views.ReceitaDetail.as_view()),
	url(r'^ingredientes/$', views.render_home),
	url(r'^receitas/$', views.render_view2),
	url(r'^chat/$', views.render_chat),
	url(r'^api/fotos/$', views.Foto_ReceitaList.as_view()),
	url(r'^api/fotos/(?P<pk>[0-9]+)/$', views.Foto_ReceitaDetail.as_view()),
	
]

#Using format suffixes gives us URLs that explicitly refer to a given format, 
#and means our API will be able to handle URLs such as http://example.com/api/items/4.json.
urlpatterns = format_suffix_patterns(urlpatterns)