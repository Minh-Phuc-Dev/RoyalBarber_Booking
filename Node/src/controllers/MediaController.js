const {randomUUID} = require("crypto")
const multer = require('multer');
const path = require('path');
const {JsonResult} = require("src/helpers/JsonResult");
const {HTTP_CODE} = require("src/helpers/HttpStatus");

const storage = multer.diskStorage(
    {
        destination: function (req, file, callback) {
            callback(null, path.join(process.cwd(), "public"));
        },
        filename: function (req, file, callback) {
            callback(null, `${randomUUID().toString()}.${file.originalname.split('.').at(-1)}`);
        }
    }
);

const MULTER = multer({storage: storage});

class MediaController {
    
    static upload(request, response) {
        MULTER.single("file")(
            request,
            response,
            function (error) {
                if (error) {
                    return JsonResult.builder(
                        HTTP_CODE.BAD_REQUEST,
                        HTTP_CODE.BAD_REQUEST,
                        null,
                        error.message
                    ).send(response)
                }
                
                JsonResult.builder(
                    HTTP_CODE.OK,
                    HTTP_CODE.OK,
                    request.file.filename,
                    "File uploaded successfully"
                    
                ).send(response);
            }
        )
    }
    
    static get (request, response) {
        const {file} = request.params;
        const filePath = path.join(process.cwd(), "public", file);
        
        if(!require('fs').existsSync(filePath)){
            return JsonResult.builder(
                HTTP_CODE.NOT_FOUND,
                HTTP_CODE.NOT_FOUND,
                null,
                "File not found"
            ).send(response)
        }
        
        response.sendFile(filePath);
    }
    
    
}

module.exports = {
    MediaController
}