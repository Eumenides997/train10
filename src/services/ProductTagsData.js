import axios from 'axios'

var ht = 'https://www.wshopnow.com'
var token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNWQ3MzkxM2Y4MTdkODQ2NDZhNTJlM2M0OTZmMjlkNzFmMDdkNWU5MTUxZTYwNWYzZmE5NzE3YWQ4NjU4ZmFjMDIxNjZkZDg5YWJjNjg4YzYiLCJpYXQiOjE2MDkyMTM1OTUsIm5iZiI6MTYwOTIxMzU5NSwiZXhwIjoxNjQwNzQ5NTk1LCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.cNKlyg3CrptIKLqq3TS0Pty7EB5PYb84elW1l0fHgfNZgsZIbludjSGLqrG7NUOtqowkpo3T1cgfZD3-XYo_0-Yy45ixLvVBfToCSdqkGElvW8E3dfiFEbTSWRPI-diJeYI7BFHsOwRCL5RQGSNuqy4YxV2O7pptYczqM7xvegyHHChMitAKBlfhpzu_zFZw6IKWpl8VmtOI-ZgkRrAfhJ8W9uHFvpF8fpQpwSbfqZG5pYHFq5PQjdWkyLj7HtmPmT53yKnEFTIGAWo1SSS9ZNdKQf6FprmKEuMe1TnUwmJDWkHJlz-6sYEZ-nYRBnDO8Pu7Nu1dmA8b5aLisLBX-yNBUlPWbZaNhBXwRq_QGdI1WdLqpTJCzJb_V1OmbZDilPElJwMm3Zdk5AEVd5CS2TdWhksgOiw-HEs-tUd5EtldFYhKCiRV6oodBqUA_x9AkTW9s4UDFTOQeX0wdw8Va896OuIscXG95YwSMeLGZpkA6G2ws74zyyKXzUGa_xqzHnW47PqStJ6Nyq93TVFJ1CrJiWk2G1WmZIDRah1S39oVg6ezt7T0GCJLf0FzCioQU1x7eNIkgXZHyN-yFwA4mbrgG5zhmxSEwYXhD9-KgoQ0yH0wxliCV1_TReG8C6ptu0dUOXxuta2FOwclE_IOy22zhgwVesrX7mflRzXgD3c'

export default {
    getTags: () => axios({
        method: 'GET',
        url: ht + '/api/admin/tags?page=1&page_size=25',
        headers: { 'authorization': token }
    })
}