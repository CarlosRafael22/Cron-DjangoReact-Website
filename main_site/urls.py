from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views as authtoken_views
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
	url(r'^api/ordens_partes_receitas/$', views.Ordem_Passo_na_Parte_ReceitaList.as_view()),
	url(r'^api/ordens_partes_receitas/(?P<pk>[0-9]+)/$', views.Ordem_Passo_na_Parte_ReceitaDetail.as_view()),
	#url(r'^api/receitas/$', views.ReceitaList.as_view()),
	url(r'^api/receitas/$', views.receita_list),
	url(r'^api/receitas/(?P<pk>[0-9]+)/$', views.ReceitaDetail.as_view()),
	url(r'^$', views.render_home),
	url(r'^ingredientes/$', views.render_view1),
	url(r'^receitas/$', views.render_view2),
	url(r'^chat/$', views.render_chat),
	url(r'^api/fotos/$', views.Foto_ReceitaList.as_view()),
	#url(r'^api/fotos/$', views.foto_list),
	url(r'^api/fotos/(?P<pk>[0-9]+)/$', views.Foto_ReceitaDetail.as_view()),
	url(r'^api/usuarios/$', views.UserList.as_view()),
	url(r'^api/usuarios/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
	url(r'^api/perfis/$', views.PerfilList.as_view()),
	url(r'^api/perfis/(?P<pk>[0-9]+)/$', views.PerfilDetail.as_view()),
	url(r'^api/pacientes/$', views.PacienteList.as_view()),
	url(r'^api/pacientes/(?P<pk>[0-9]+)/$', views.PacienteDetail.as_view()),
	url(r'^api/coaches/$', views.CoachList.as_view()),
	url(r'^api/coaches/(?P<pk>[0-9]+)/$', views.CoachDetail.as_view()),
	url(r'^api/coaches/(?P<pk>[0-9]+)/pacientes_supervisionados/$', views.pacientes_coach),

	#url(r'^api-token-auth/', authtoken_views.obtain_auth_token),
	url(r'^api-token-auth/', views.CustomObtainAuthToken.as_view()),
	
]

#Using format suffixes gives us URLs that explicitly refer to a given format, 
#and means our API will be able to handle URLs such as http://example.com/api/items/4.json.
urlpatterns = format_suffix_patterns(urlpatterns)