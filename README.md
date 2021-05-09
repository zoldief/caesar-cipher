# Caesar cipher CLI tool

**CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

**How to use:**

1.  **download repository**:

```bash
$ git clone https://github.com/rolling-scopes-school/zoldief-NODEJS2021Q2/
```

2.  **switch to app branch**:

```bash
$ git checkout caesar-cipher
```

3.  **install all dependences**:```bash
    $ git checkout caesar-cipher

```bash
$ npm i
```

4.  **run app**:

```bash
node index <arguments>
```

**CLI tool accept 4 options (short alias and full name):**

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

**Usage example:**

1. _-a (--action)_ is **encode**

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. _-a (--action)_ is **decode**  
   _Decoding encoded initial string with the same -s(--shift) number produces the initial string._

```bash
$ node my_caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt
```

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`

3. Negative shift handling\_

```bash
$ node my_caesar_cli --action encode --shift -1 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!`
