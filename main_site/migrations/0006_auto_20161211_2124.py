# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-11 23:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_site', '0005_parte_da_receita_nome_da_parte'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingrediente',
            name='quantidade',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
