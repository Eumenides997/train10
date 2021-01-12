import axios from 'axios'

var ht = 'https://www.wshopnow.com'
var token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNWQ3MzkxM2Y4MTdkODQ2NDZhNTJlM2M0OTZmMjlkNzFmMDdkNWU5MTUxZTYwNWYzZmE5NzE3YWQ4NjU4ZmFjMDIxNjZkZDg5YWJjNjg4YzYiLCJpYXQiOjE2MDkyMTM1OTUsIm5iZiI6MTYwOTIxMzU5NSwiZXhwIjoxNjQwNzQ5NTk1LCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.cNKlyg3CrptIKLqq3TS0Pty7EB5PYb84elW1l0fHgfNZgsZIbludjSGLqrG7NUOtqowkpo3T1cgfZD3-XYo_0-Yy45ixLvVBfToCSdqkGElvW8E3dfiFEbTSWRPI-diJeYI7BFHsOwRCL5RQGSNuqy4YxV2O7pptYczqM7xvegyHHChMitAKBlfhpzu_zFZw6IKWpl8VmtOI-ZgkRrAfhJ8W9uHFvpF8fpQpwSbfqZG5pYHFq5PQjdWkyLj7HtmPmT53yKnEFTIGAWo1SSS9ZNdKQf6FprmKEuMe1TnUwmJDWkHJlz-6sYEZ-nYRBnDO8Pu7Nu1dmA8b5aLisLBX-yNBUlPWbZaNhBXwRq_QGdI1WdLqpTJCzJb_V1OmbZDilPElJwMm3Zdk5AEVd5CS2TdWhksgOiw-HEs-tUd5EtldFYhKCiRV6oodBqUA_x9AkTW9s4UDFTOQeX0wdw8Va896OuIscXG95YwSMeLGZpkA6G2ws74zyyKXzUGa_xqzHnW47PqStJ6Nyq93TVFJ1CrJiWk2G1WmZIDRah1S39oVg6ezt7T0GCJLf0FzCioQU1x7eNIkgXZHyN-yFwA4mbrgG5zhmxSEwYXhD9-KgoQ0yH0wxliCV1_TReG8C6ptu0dUOXxuta2FOwclE_IOy22zhgwVesrX7mflRzXgD3c'

export default {
    getProducts: () => axios({
        method: 'GET',
        url: ht + '/api/admin/products?page_size=25',
        headers: { 'authorization': token }
    }),
    screenProducts: (data) => axios({
        method: 'GET',
        url: ht + '/api/admin/products?' + data,
        headers: { 'authorization': token }
    }),
    createProduct: (product) => axios({
        method: 'POST',
        url: ht + '/api/admin/products',
        headers: { 'authorization': token },
        data: product
    }),
    deleteProduct: (id) => axios({
        method: "DELETE",
        url: ht + '/api/admin/products/' + id,
        headers: { 'authorization': token }
    }),
    updataProducts: (product, poststate) => axios({
        method: "PUT",
        url: ht + '/api/admin/products/' + product.ID,
        headers: { 'authorization': token },
        data: {
            "title": product.title,
            "content": "totam",
            "post_status": poststate,
            "regular_price": product.regular_price === null ? 0 : product.regular_price,
            "price": product.price === null ? 0 : product.price,
            "sku": product.sku === null ? "123" : product.sku,
            "weight": product.weight === null ? 20 : product.weight,
            "weight_unit": product.weight_unit === null ? "g" : product.weight_unit,
            "manage_stock": product.manage_stock === null ? "yes" : product.manage_stock,
            "stock": product.stock === null ? 0 : product.stock,
            "backorders": product.backorders === null ? "yes" : product.backorders,
            "tags": product.tags === null ? [] : product.tags,
            "categories": product.categories === null ? [] : product.categories,
            "gallery": product.gallery === null ? [] : product.gallery,
            "attrs": product.attrs === null ? [] : product.attrs,
            "variants": product.variants === null ? [] : product.variants,
            "slug": product.slug === null ? "123" : product.slug
        }
    })
}