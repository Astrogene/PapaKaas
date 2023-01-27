import formidable from "formidable";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  /*  if (event.context.auth.auth_level == 'ADMIN') {*/
        const form = formidable({ multiples: true });
        let oldPath = "";
        let newPath = "";
        const data = await new Promise((resolve, reject) => {
            form.parse(event.node.req, (err, fields, files) => {
                if (err) {
                    reject(err);
                }
                if (!files.images || !fields.title || !fields.text) {
                    resolve({
                        status: "error",
                        message: "Please upload photos in the form",
                    });
                    return
                }
                newPath = `${path.join("content/posts", (fields.title as string).toLowerCase().replaceAll(' ', '-'))}`;
                if (!fs.existsSync(newPath)) {
                    fs.mkdirSync(newPath);
                }
                else {
                    resolve({
                        status: "404"
                    })
                    return
                }
                newPath = `${path.join("public/posts", (fields.title as string).toLowerCase().replaceAll(' ', '-'))}`
                if (!fs.existsSync(newPath)) {
                    fs.mkdirSync(newPath);
                }
                else {
                    resolve({
                        status: "404"
                    })
                    return
                }
                if (!(<any>files.images).length) {
                    if ((files.images as unknown as formidable.File).mimetype && 
                    ((files.images as unknown as formidable.File).mimetype || "").startsWith("image/")) {
                        let imageName = (files.images as unknown as formidable.File).originalFilename;
                        oldPath = (files.images as unknown as formidable.File).filepath;
                        newPath = `${path.join("public/posts", (fields.title as string).toLowerCase().replaceAll(' ', '-'), imageName || "")}`;
                        fs.copyFileSync(oldPath, newPath);
                    }
                }
                else {
                    Array.from(files.images as unknown as formidable.File[]).forEach(element => {
                        if (element.mimetype && element.mimetype.startsWith("image/")) {
                            let imageName = element.originalFilename;
                            oldPath = element.filepath;
                            newPath = `${path.join("public/posts", (fields.title as string).toLowerCase().replaceAll(' ', '-'), imageName || "")}`;
                            fs.copyFileSync(oldPath, newPath);
                        }
                        else {
                            //TODO delete all other files
                            resolve({
                                status: "404"
                            })
                            return
                        }
                    });
                }
                newPath = `${path.join("content/posts", (fields.title as string).toLowerCase().replaceAll(' ', '-'), (fields.title as string).toLowerCase().replaceAll(' ', '-') )}`;
                fs.writeFileSync(newPath + ".md", fields.text as string)
                resolve({
                    status: "200"
                })
            });
        });
        console.log(data)
        return data;
    /*}*/
})