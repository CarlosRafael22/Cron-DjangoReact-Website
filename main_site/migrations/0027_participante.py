# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-04-04 18:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_site', '0026_auto_20170325_1658'),
    ]

    operations = [
        migrations.CreateModel(
            name='Participante',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('telegram_chat_id', models.CharField(max_length=50)),
                ('nome', models.CharField(max_length=50)),
            ],
        ),
    ]