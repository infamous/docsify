import fs from 'fs'
import path from 'path'
import child_process from 'child_process'
import { fileURLToPath } from 'url';

const {spawn} = child_process
const dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2)
fs.readdir(path.join(dirname, '../src/themes'), (err, files) => {
    if (err) {
        console.error('err', err)
        process.exit(1)
    }
    files.map(async (file) => {
        if (/\.styl/g.test(file)) {
            var stylusCMD;
            const stylusBin = ['node_modules', 'stylus', 'bin', 'stylus'].join(path.sep)
            var cmdargs = [
                stylusBin,
                `src/themes/${file}`,
                '-u',
                'autoprefixer-stylus'
            ]
            cmdargs = cmdargs.concat(args)

            stylusCMD = spawn('node', cmdargs, { shell: true })

            stylusCMD.stdout.on('data', (data) => {
                console.log(`[Stylus Build ] stdout: ${data}`);
            });

            stylusCMD.stderr.on('data', (data) => {
                console.error(`[Stylus Build ] stderr: ${data}`);
            });

            stylusCMD.on('close', (code) => {
                const message = `[Stylus Build ] child process exited with code ${code}`

                if (code !== 0) {
                  console.error(message);
                  process.exit(code)
                }
                console.log(message);
            });
        } else {
            return
        }

    })
})
