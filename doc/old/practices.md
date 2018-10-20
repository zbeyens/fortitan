# Project Guidelines

# Functions
- Function arguments (2 or fewer ideally), use objects.
- Set default objects with Object.assign.
- Don't use flags as function parameters (one thing per function).
- Avoid Side Effects (part 1). A function produces a side effect if it does anything other than take a value in and return another value or values (pure functions, highly testable and reusable). A side effect could be writing to a file, modifying some global variable. Now, you do need to have side effects in a program on occasion. Like the previous example, you might need to write to a file. What you want to do is to centralize where you are doing this. Don't have several functions and classes that write to a particular file. Have one service that does it. One and only one.
The main point is to avoid common pitfalls like sharing state between objects without any structure, using mutable data types that can be written to by anything, and not centralizing where your side effects occur.
- Avoid Side Effets (part 2). Same for objects/arrays. To avoid concurrency problem, clone it, edit it, and return the clone. Two caveats to mention to this approach:
    - There might be cases where you actually want to modify the input object, but when you adopt this programming practice you will find that those cases are pretty rare. Most things can be refactored to have no side effects!
    - Cloning big objects can be very expensive in terms of performance. Luckily, this isn't a big issue in practice because there are great libraries that allow this kind of programming approach to be fast and not as memory intensive as it would be for you to manually clone objects and arrays.
- Encapsulate conditionals
- Avoid negative conditionals
- Avoid conditionals: one function does only one thing. One solution: inheritance.
- Avoid type-checking to call children methods: use a parent method (polymorphism).
- Don't over-optimize

# Objects and Data Structures
## Optional
- Use getters and setters (optional)
- When you want to do more beyond getting an object property, you don't have to look up and change every accessor in your codebase.
- Makes adding validation simple when doing a set.
- Encapsulates the internal representation.
- Make objects have private members (optional)

# Classes
- Use method chaining. In your class functions, simply return this at the end of every function, and you can chain further class methods onto it.
- Prefer composition over inheritance. Inheritance only when:
    - Your inheritance represents an "is-a" relationship and not a "has-a" relationship (Human->Animal vs. User->UserDetails).
    - You can reuse code from the base classes (Humans can move like all animals).
    - You want to make global changes to derived classes by changing a base class. (Change the caloric expenditure of all animals when they move).

# SOLID
## Single Responsibility Principle (SRP)
"There should never be more than one reason for a class to change"

## Open/Closed Principle (OCP)
"Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification." What does that mean though? This principle basically states that you should allow users to add new functionalities without changing existing code.

## Liskov Substitution Principle (LSP)
If you have a parent class and a child class, then the base class and child class can be used interchangeably without getting incorrect results

## Interface Segregation Principle (ISP)
"Clients should not be forced to depend upon interfaces that they do not use" (i.e. make settings optional).
- OK without interface

## Dependency Inversion Principle (DIP)
- High-level modules should not depend on low-level modules. Both should depend on abstractions.
- Abstractions should not depend upon details. Details should depend on abstractions.
Concerns the method of coupling between high level modules and low level modules.
With traditional layered architecture, high level modules (components encapsulating the core business logic of the application) take dependencies upon low level modules (components providing infrastructure concerns). 

When adhering to the Dependency Inversion Principle, this relationship is reversed (i.e. inverted).  Rather than high level modules being coupled to low level modules, low level modules are coupled to interfaces declared by the high level modules. 

- OK without interface

# Testing
Testing is more important than shipping