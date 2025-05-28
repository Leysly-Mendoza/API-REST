# ApiPersonajes.DefaultApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**personajesGet**](DefaultApi.md#personajesGet) | **GET** /personajes | Obtener personajes



## personajesGet

> PersonajesGet200Response personajesGet()

Obtener personajes

Devuelve un arreglo de personajes

### Example

```javascript
import ApiPersonajes from 'api_personajes';

let apiInstance = new ApiPersonajes.DefaultApi();
apiInstance.personajesGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**PersonajesGet200Response**](PersonajesGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

