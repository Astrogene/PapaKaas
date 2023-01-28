import readingTime from 'reading-time'
import fs from 'fs'
import path from "path";
export default defineNitroPlugin((nitroApp) => {
    let readingTimeDoc = {}

    nitroApp.hooks.hook('content:file:beforeParse', (file: any) => {
        let new_body
        if (file.body.startsWith('---')) {
            new_body = file.body.replace(/---([\s\S]*)---/g, '')
        }
        else{
            new_body = file.body
        }
        new_body = new_body.replace(/(<!--more-->)/g,'')
        if (new_body && file._id.endsWith('.md')){
            readingTimeDoc = readingTime(new_body)
        }
    })
    nitroApp.hooks.hook('content:file:afterParse', (file: any) => {
        file.readingTime = readingTimeDoc
        const new_path = `${'content/' + path.join(file._file)}`
        const stats = fs.statSync(new_path)
        if (stats && stats.birthtime && stats.mtime){
            file.createdAt = stats.birthtime
            file.updatedAt = stats.mtime
        }
    })
})
