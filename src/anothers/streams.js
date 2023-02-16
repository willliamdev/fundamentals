import { Readable, Writable, Transform } from "node:stream"



// readable stream
class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push("fim")
        this.push(null)
      } else {
        const buffer = Buffer.from(String(i))

        this.push(buffer)
      }
    }, 100)
  }
}


// transfomer stream
class InverserNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}



// writrabel stream
class MutiplyByThreeStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 2)
    callback()
  }
}



new OneToHundredStream()
  .pipe(new InverserNumberStream())
  .pipe(new MutiplyByThreeStream())