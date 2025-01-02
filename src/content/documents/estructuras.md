---
title: "Estructuras de Datos"
description: "Entiende las estructuras de datos en ANSI C"
date: 2025-01-01
tags: ["C", "ANSI C", "Guia"]
image: "/documents-img/estructuras-c.png" 
---

Primeramente, antes de indagar en el tema, es necesario tener y entender los conceptos básicos de programación en C. Por ello, recomiendo encarecidamente que leas el libro **"El lenguaje de programación C"** de Brian W. Kernighan y Dennis M. Ritchie, escrito y diseñado por los mismos creadores del lenguaje. 

Esta guia está diseñada para aquellos que ya tienen conocimientos básicos y desean aprender sobre estructuras de datos, esta basada en el capitulo 6 del libro mencionado anteriormente, seleccionando y reescribiendo los conceptos más importantes.

## Introducción

Es fundamental entender que es una estructura de dato y el porque de su importancia. Una estructura es una colección de una o más variables, posiblemente de diferentes tipos, agrupadas bajo un solo nombre.

Para aquellos ya familiarizados con lenguajes de alto nivel (La nomenclatura de alto o bajo nivel se refiere a la cercanía con el lenguaje de máquina) como puede ser Python, sabrán que se pueden generar listas, una lista es una estructura de datos que permite almacenar una colección de elementos, por ejemplo, una lista de números, una lista de palabras, etc. Esto es una estructura de datos, una colección de elementos bajo un solo nombre, la cual almacena información de manera organizada.

```python

lista = [1, 2, 3, 4, 5] # -> [1, 2, 3, 4, 5]

print(lista[0]) # -> 1

lista.append(6) # -> [1, 2, 3, 4, 5, 6]
```
<p style="text-align: center;">1.1 Listas en Python</p>

Particularmente en C, no existe una estructura de datos como tal, pero se pueden crear estructuras de datos a través de strucs, las cuales permiten agrupar diferentes tipos de datos bajo un solo nombre.

Es importante **no confundir** las estructuras de datos con las estructuras de control, las estructuras de control son aquellas que permiten controlar el flujo de un programa, como los bucles y las condicionales. **Ni mucho menos confundir** structs con estructuras de datos, un struct es una colección de variables propias de C.

## Arrays

Un array es una estructura de datos que permite almacenar una colección de elementos del mismo tipo (elementos homogéneos). En C, los arrays son estructuras de datos primitivas, es decir, son estructuras de datos que no pueden ser descompuestas en estructuras más simples, esto sera explicado más adelante. De momento es importante entender que un array es una colección de elementos del mismo tipo, por ejemplo, un array de enteros, un array de caracteres, etc.

```c

int array[5];
array[0] = 1;
array[1] = 2;
array[2] = 3;
array[3] = 4;
array[4] = 5;
```

Pese a tener similitud con las listas de Python, los arrays en C tienen una limitación, la cual es que su tamaño debe ser conocido en tiempo de compilación, es decir, el tamaño del array debe ser conocido antes de que el programa sea compilado. Esto puede ser un problema si no se conoce el tamaño del array, por lo que se debe tener cuidado al definir arrays en C.

A su vez, es importante entender como se guarda en memoria un array. Un array en C es un bloque contiguo de memoria, es decir, los elementos del array se guardan uno detrás del otro en memoria. Por lo que, si se tiene un array de 5 elementos, el primer elemento se guardara en la dirección de memoria `0x1000`, el segundo elemento en `0x1004`, el tercer elemento en `0x1008`, y así sucesivamente. Por ello, es que se utiliza la funcion `malloc` para asignar memoria dinamicamente, ya que esta función permite reservar un bloque contiguo de memoria.

```

[0x1000][0x1004][0x1008][0x100C][0x1010]
    |       |       |       |       |
    V       V       V       V       V
  [ 1 ]   [ 2 ]   [ 3 ]   [ 4 ]   [ 5 ]
```

*Los saltos son de 4 en 4 porque un entero utiliza 4 bytes*

Que sean contiguos es importante, porque permite calcular la dirección de memoria de un elemento a partir de la dirección de memoria del primer elemento. Por ejemplo, si se tiene un array de 5 elementos y se desea acceder al tercer elemento, se puede calcular la dirección de memoria del tercer elemento a partir de la dirección de memoria del primer elemento y el tamaño de los elementos.

```c

int array[5] = {1, 2, 3, 4, 5};

int *puntero = &array[0]; // -> 0x1000

int tercerElemento = *(puntero + 2); // -> 3

```

En este caso, se obtiene la dirección de memoria del primer elemento del array, se suma 2 al puntero para obtener la dirección de memoria del tercer elemento, y se obtiene el valor del tercer elemento. Esto es posible gracias a que los elementos del array se guardan uno detrás del otro en memoria.

Para entender mas el uso con punteros, podriamos hacer un simil de lo que hacemos con `array[0]` simplemente utilizando punteros.

```c

*(array + i)

```



Los otros espacios en memoria no reservados, podrian ser utilizados por otros programas, por lo que es importante tener en cuenta que la memoria reservada no se sobrepase y conocer el tamaño del array.



**¿Que son realloc o calloc?** La función `realloc` permite redimensionar un bloque de memoria, es decir, si se tiene un array de 5 elementos y se desea redimensionar a 10 elementos, se puede utilizar `realloc` para redimensionar el array. Por otro lado, `calloc` permite asignar memoria y limpiar. El problema de ambas funciones es que no garantizan que el bloque de memoria contiguo este disponible, lo que resulta no lo mas conveniente en un software. Por ello, es recomendable utilizar `malloc` para asignar memoria dinamicamente.

<p style="text-align: right;">Imagina que el nuevo espacio a reservar para agrandar tu array <br>este siendo utilizado por Safari o por Visual Studio Code.</p>


## Categorización de las Estructuras
