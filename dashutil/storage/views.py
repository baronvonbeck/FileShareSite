from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.edit import CreateView
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder

from .models import Storage, File_Data
import json

def storage_home(request):
    return JsonResponse({'mystring': "figure out what to do with this page"})


# /storage/storage_page_name
# request data for POSTing new file will have 
#       new_filename    - name of the new file
#       new_size        - size of the new file
#       new_parent_id   - id of the new file's parent directory
@ensure_csrf_cookie
def storage_page(request, storage_page_name):
    if request.method == "GET":
        context = _get_context_for_storage(storage_page_name)
        
        return render(request, 'storage/file_in_storage_form.html', context)

    
    elif request.method == "POST":
        # files_to_post = request.POST.dict()

        parent_directory = File_Data.file_datamanager.get_file_data(
            request.POST.dict()['parent_directory_id'])
        files_to_post = request.FILES.getlist('file')
        
        size_increase, new_file_data = File_Data.file_datamanager.upload_new_files(
            parent_directory, files_to_post)
        
        File_Data.file_datamanager.update_parent_directory_sizes_iteratively(
            size_increase, parent_directory)

        # return HttpResponse(_serialize_files_as_json(new_file_data))


        return HttpResponse([])


# Returns the appropriate context for a storage page
def _get_context_for_storage(storage_page_name):
    context = {}
    child_files = []

    storage, created = Storage.storage_manager.get_or_create_storage(
        _convert_string(storage_page_name))

    if not created:
        # storage_page already existed, so pull all of the child files
        child_files = File_Data.file_datamanager.get_children_of_storage(storage)
    
    context['storage_files'] = _serialize_files_as_json(child_files)
    context['storage_page_name'] = storage.storage_name
    context['storage_page_id'] = storage.id.id

    return context


# Serializes a list of files as a json object to return
def _serialize_files_as_json(files):
    return json.loads(serializers.serialize('json', files, 
        fields=('filename', 'upload_path', 'create_timestamp', 'modify_timestamp', 
            'size', 'parent_directory')))


def _convert_string(s):
    return s.replace('\\','').replace('\/', '')
    