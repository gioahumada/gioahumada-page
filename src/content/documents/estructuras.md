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

Para aquellos ya familiarizados con lenguajes de alto nivel (La nomenclatura de alto o bajo nivel se refiere a la cercanía con el lenguaje de máquina) como puede ser Python, sabrán que se pueden generar listas, una lista es una estructura de datos que permite almacenar una colección de elementos, por ejemplo, una lista de enteros, una lista de strings, etc. Esto es una estructura de datos, una colección de elementos bajo un solo nombre, la cual almacena información de manera organizada.

```python

lista = [1, 2, 3, 4, 5] # -> [1, 2, 3, 4, 5]

print(lista[0]) # -> 1

lista.append(6) # -> [1, 2, 3, 4, 5, 6]
```
<p style="text-align: center;">1.1 Listas en Python</p>

Particularmente en C, no existe una estructura de datos como tal, pero se pueden crear estructuras de datos a través de structs, los cuales permiten agrupar diferentes tipos de datos bajo un solo nombre.

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
<p style="text-align: center;">2.1 Inicialización array</p>

Pese a tener similitud con las listas de Python, los arrays en C tienen una limitación, la cual es que su tamaño debe ser conocido en tiempo de compilación, es decir, el tamaño del array debe ser conocido antes de que el programa sea compilado. Esto puede ser un problema si no se conoce el tamaño del array, por lo que se debe tener cuidado al definir arrays en C.

A su vez, es importante entender como se guarda en memoria un array. Un array en C es un bloque contiguo de memoria, es decir, los elementos del array se guardan uno detrás del otro en memoria. Por lo que, si se tiene un array de 5 elementos, el primer elemento se guardara en la dirección de memoria `0x1000`, el segundo elemento en `0x1004`, el tercer elemento en `0x1008`, y así sucesivamente. Por ello, es que se utiliza la funcion `malloc` para asignar memoria dinamicamente, ya que esta función permite reservar un bloque contiguo de memoria.

```

[0x1000][0x1004][0x1008][0x100C][0x1010]
  |       |       |       |       |
  V       V       V       V       V
  [ 1 ]   [ 2 ]   [ 3 ]   [ 4 ]   [ 5 ]

```
<p style="text-align: center;">2.2 Ejemplo de datos en memoria.</p>

*Los saltos son de 4 en 4 porque un entero utiliza 4 bytes*

Que sean contiguos es importante, porque permite calcular la dirección de memoria de un elemento a partir de la dirección de memoria del primer elemento. Por ejemplo, si se tiene un array de 5 elementos y se desea acceder al tercer elemento, se puede calcular la dirección de memoria del tercer elemento a partir de la dirección de memoria del primer elemento y el tamaño de los elementos.

```c
int array[5] = {1, 2, 3, 4, 5};

int *puntero = &array[0]; // -> 0x1000

int tercerElemento = *(puntero + 2); // -> 3

```
<p style="text-align: center;">2.2 Ejemplo de datos en memoria.</p>

En este caso, se obtiene la dirección de memoria del primer elemento del array, se suma 2 al puntero para obtener la dirección de memoria del tercer elemento, y se obtiene el valor del tercer elemento. Esto es posible gracias a que los elementos del array se guardan uno detrás del otro en memoria.

Para entender mas el uso con punteros, podriamos hacer un simil de lo que hacemos con `array[0]` simplemente utilizando punteros.

```c

*(array + i)
```
<p style="text-align: center;">2.2 Ejemplo de datos en memoria.</p>

Los otros espacios en memoria no reservados, podrian ser utilizados por otros programas, por lo que es importante tener en cuenta que la memoria reservada no se sobrepase y conocer el tamaño del array.

Para imprimir un array, se puede utilizar un bucle `for` para recorrer el array e imprimir cada elemento. Es importante tener en cuenta que el tamaño del array debe ser conocido, ya que se debe indicar el tamaño del array en el bucle `for`, nuevamente para evitar errores como el conocido `Segmentation Fault`, el cual se produce cuando se intenta acceder a una dirección de memoria no permitida. 

```c

int tam = 5; // Tamaño del array
int array[tam] = {1, 2, 3, 4, 5};
int i;

for (i = 0; i < tam; i++) {
  printf("%d ", array[i]); // -> 1 2 3 4 5
}
```
<p style="text-align: center;">2.2 Ejemplo de datos en memoria.</p>

Para recorrer un array de manera inversa, se puede utilizar un bucle `for` que recorra el array de manera inversa, es decir, desde el último elemento hasta el primer elemento. Para ello, se puede utilizar un bucle `for` que recorra el array desde el último elemento hasta el primer elemento, restando 1 en cada iteración.

```c

int tam = 5; // Tamaño del array
int array[tam] = {1, 2, 3, 4, 5};
int i;

for (i = tam - 1; i >= 0; i--) {
  printf("%d ", array[i]); // -> 5 4 3 2 1
}
```
<p style="text-align: center;">2.2 Ejemplo de datos en memoria.</p>

**¿Que es malloc?**
La función `malloc` permite asignar memoria dinamicamente, es decir, reservar un bloque de memoria en tiempo de ejecución. Por ejemplo, si se desea reservar un array de 5 elementos, se puede utilizar `malloc` para reservar un bloque de memoria de 5 elementos. La función `malloc` devuelve un puntero al bloque de memoria reservado, el cual se puede utilizar para acceder a los elementos del array. ¿Porque se utiliza? Esto es debido a que no siempre iniciaremos o compilaremos un programa con un tamaño fijo, por lo que es necesario reservar memoria dinamicamente.

```c

int tam = 5; // Tamaño del array
int *array = (int *)malloc(tam * sizeof(int));
int i;

// Inicializar el array

for (i = 0; i < tam; i++) {
  array[i] = i + 1; // Estamos rellenando el array con valores de 1 a 5
}

// Imprimir el array

for (i = 0; i < tam; i++) {
  printf("%d ", array[i]); // -> 1 2 3 4 5
}

```
<p style="text-align: center;">2.2 Ejemplo de datos en memoria.</p>

**¿Que son realloc o calloc?**

La función `realloc` permite redimensionar un bloque de memoria, es decir, si se tiene un array de 5 elementos y se desea redimensionar a 10 elementos, se puede utilizar `realloc` para redimensionar el array. Por otro lado, `calloc` permite asignar memoria y limpiar. El problema de ambas funciones es que no garantizan que el bloque de memoria contiguo este disponible, lo que resulta no lo mas conveniente en un software. Por ello, es recomendable utilizar `malloc` para asignar memoria dinamicamente.

<p style="text-align: right;">Imagina que el nuevo espacio a reservar para agrandar tu array <br>este siendo utilizado por Safari o por Visual Studio Code.</p>

**Uso con Structs**

Los arrays pueden ser utilizados con structs, es decir, se pueden crear arrays de structs. Por ejemplo, si se tiene una estructura `Persona` que almacena el nombre y la edad de una persona, se puede crear un array de `Persona` que almacene una colección de personas.

```c
struct Persona {
  char nombre[50]; // -> Esto es un array de caracteres
  int edad;
};

int main() {
  int tam = 5; // Tamaño del array
  struct Persona personas[tam]; // -> Array de personas
  int i;

  // Inicializar el array

  for (i = 0; i < tam; i++) {
    strcpy(personas[i]->nombre, "Persona");
    personas[i]->edad = i + 1;
  }

  // Imprimir el array

  for (i = 0; i < tam; i++) {
    printf("Nombre: %s, Edad: %d\n", personas[i].nombre, personas[i].edad);
  }
}

```
<p style="text-align: center;">2.2 Ejemplo de datos en memoria.</p>

En este caso, se tiene una estructura `Persona` que almacena el nombre y la edad de una persona, y se crea un array de `Persona` que almacena una colección de personas. Se inicializa el array de personas con un bucle `for` que recorre el array y asigna un nombre y una edad a cada persona. Luego, se imprime el array de personas con un bucle `for` que recorre el array y imprime el nombre y la edad de cada persona.

*En caso de no quedar muy claro este punto, se recomienda entender los structs como si fuera una variable, en este caso tendriamos un array de tipo de dato `struct Persona`, variable `personas` de tamaño `tam` y cada elemento del array seria una variable de tipo `struct Persona`.*

Para ejercitar, realizaremos una busqueda en un array de structs, en este caso, buscaremos una persona por su nombre. Tendremos que recorrer el array de personas y comparar el nombre de cada persona con el nombre buscado. Si se encuentra la persona, se devolverá la persona, de lo contrario, se devolverá `NULL`.

```c

struct Persona {
  char nombre[50]; // -> Esto es un array de caracteres
  int edad;
};

struct Persona *buscarPersona(struct Persona *personas, int tam, char *nombre) {

  int i;
  struct Persona rec = personas;

  for (i = 0; i < tam; i++) {
    if(strcmp(rec[i]->nombre, nombre) == 0) {
    return rec[i];
    }

  return NULL;
}
```
<p style="text-align: center;">2.2 Ejemplo de datos en memoria.</p>

En este caso, se tiene una función `buscarPersona` que recibe un array de personas, el tamaño del array y un nombre a buscar. La función recorre el array de personas con un bucle `for` y compara el nombre de cada persona con el nombre buscado. Si se encuentra la persona, se devuelve la persona, de lo contrario, se devuelve `NULL`.

<!-- **Recordatorio:** *Los structs pueden ser utilizados como variables, por lo que se puede acceder a los elementos de un struct con el operador `.` y a los elementos de un puntero a un struct con el operador `->`. Prioriza el uso del operador `->`, ademas recuerda que un struct puede ser NULL, por lo que es importante verificar si el struct es NULL antes de acceder a sus elementos.* -->

El codigo mostrado anteriormente tiene problemas de robustez, por lo que se recomienda verificar si el array de personas es `NULL` antes de recorrer el array, y verificar si la persona es `NULL` antes de acceder a sus elementos. Esto es importante para evitar errores como el conocido `Segmentation Fault`, el cual se produce cuando se intenta acceder a una dirección de memoria no permitida. Intenta mejorar el codigo anterior para evitar estos errores.

```c

struct Persona {
  char nombre[50]; // -> Esto es un array de caracteres
  int edad;
};

struct Persona *buscarPersona(struct Persona *personas, int tam, char *nombre) {
  int i;
  struct Persona rec = personas;

  if(personas == NULL) {
    return NULL;
  }


  for (i = 0; i < tam; i++) {
    if(rec[i] == NULL) return NULL;
  
    if(strcmp(rec[i]->nombre, nombre) == 0) {
    return rec[i];
    }
  }

  return NULL;
  }
```
<p style="text-align: center;">2.2 Ejemplo de datos en memoria.</p>

Con esta funcion mejorada ademas, estamos suponiendo que el array esta compacto, esto hace referencia a que, al recorrer el array y encontrar un espacio nulo, se detendra la busqueda. Si se desea buscar en un array que no esta compacto, se recomienda recorrer el array y verificar si el elemento es `NULL` antes de comparar el nombre de la persona.

## Listas Enlazadas

Una lista enlazada es una estructura de datos que permite almacenar una colección de elementos de manera dinámica. En C, las listas enlazadas son estructuras de datos no primitivas, es decir, son estructuras de datos que pueden ser descompuestas en estructuras más simples. De momento es importante entender que una lista enlazada es una colección de elementos que se enlazan entre sí, es decir, cada elemento de la lista enlazada apunta al siguiente elemento de la lista enlazada.

```c

struct Nodo {
  int dato;
  struct Nodo *siguiente;
};

```

En este caso, se tiene una estructura `Nodo` que almacena un dato y un puntero al siguiente nodo. La estructura `Nodo` se utiliza para crear una lista enlazada, la cual almacena una colección de nodos que se enlazan entre sí. Cada nodo de la lista enlazada apunta al siguiente nodo de la lista enlazada, lo que permite recorrer la lista enlazada de manera secuencial.

Para crear una lista enlazada, se puede utilizar un puntero al primer nodo de la lista enlazada, el cual se conoce como el puntero a la cabeza de la lista enlazada. El puntero a la cabeza de la lista enlazada apunta al primer nodo de la lista enlazada, lo que permite recorrer la lista enlazada de manera secuencial.

```c

struct Nodo *cabeza = NULL;

```

En este caso, se tiene un puntero `cabeza` que apunta al primer nodo de la lista enlazada, el cual se inicializa con `NULL` para indicar que la lista enlazada está vacía. El puntero `cabeza` se utiliza para recorrer la lista enlazada de manera secuencial, comenzando por el primer nodo de la lista enlazada.

Para insertar un nodo al final de la lista enlazada, se puede utilizar un bucle `while` que recorra la lista enlazada hasta llegar al último nodo de la lista enlazada. Una vez que se llega al último nodo de la lista enlazada, se crea un nuevo nodo con el dato a insertar y se enlaza al último nodo de la lista enlazada.

```c

void insertarNodo(int dato) {
  struct Nodo *nuevoNodo = (struct Nodo *)malloc(sizeof(struct Nodo));
  struct Nodo *actual = cabeza;

  nuevoNodo->dato = dato;
  nuevoNodo->siguiente = NULL;

  if (cabeza == NULL) {
    cabeza = nuevoNodo;
  } else {
    while (actual->siguiente != NULL) {
      actual = actual->siguiente;
    }

    actual->siguiente = nuevoNodo;
  }
}

```
