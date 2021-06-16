export const StatusCode: Object | any = {

  "LOGIN200": {
    "message": "User logged in successfully",
    "status_code": 200,
    "success": true,
  },

  "USER200": {
    "message": "User registered successfully",
    "status_code": 201,
    "success": true,
  },

  "USER400": {
    "message": "User already exists",
    "status_code": 404,
    "success": false,
  },

  "USER404": {
    "message": "User does not exists",
    "status_code": 404,
    "success": false,
  },

  "SERVER500": {
    "message": "Internal Server Error",
    "status_code": 500,
    "success": false,
  },

};
