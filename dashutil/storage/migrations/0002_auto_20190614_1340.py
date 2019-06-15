# Generated by Django 2.1.5 on 2019-06-14 20:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storage',
            name='id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='storage.File_Data'),
        ),
        migrations.AlterField(
            model_name='storage',
            name='storage_name',
            field=models.TextField(primary_key=True, serialize=False),
        ),
    ]
