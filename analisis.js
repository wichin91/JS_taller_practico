console.log(salarios)

// Analisis personal
function encontrarPersona(persona){
    return salarios.find(person =>{
        return person.name == persona
    })
}

function medianaPorPersona(nombre){
    const trabajos = encontrarPersona(nombre).trabajos
    const salarios = trabajos.map(elemento => elemento.salario)
    const medianaSalarios = PlatziMath.calcularMediana(salarios)
    return medianaSalarios
}

function proyeccionSalario(nombre, years){
    const trabajos = encontrarPersona(nombre).trabajos
    const salarios = trabajos.map(elemento => elemento.salario)
    PlatziMath.ordenarLista(salarios)
    const incrSalario = []

    console.log(salarios);
    for(let i=0; i<salarios.length-1; i++){
        incrSalario.push((salarios[i+1]/salarios[i])-1)
    }
    console.log(incrSalario)

    const incrPromedio = PlatziMath.calcularMediana(incrSalario)
    console.log(incrPromedio)
    const ultimoSalario = salarios[salarios.length-1]
    const proyeccion = ultimoSalario * Math.pow((1+incrPromedio),years)
    
    return proyeccion
}

// console.log(medianaPorPersona("Jorge"))
// console.log(proyeccionSalario("Juanita",1))


// Analisis empresarial
const empresas = {}
for (const persona of salarios){
    for (const trabajo of persona.trabajos) {
        if (!empresas[trabajo.empresa]) {
            empresas[trabajo.empresa] = {}
        }
        if (!empresas[trabajo.empresa][trabajo.year]) {
            empresas[trabajo.empresa][trabajo.year] = []
        }
        empresas[trabajo.empresa][trabajo.year].push(trabajo.salario)
    }
}
console.log(empresas);

function medianaPorEmpresa(nombre, year) {
    if (empresas[nombre]) {
        if (empresas[nombre][year]) {
            return PlatziMath.calcularMediana(empresas[nombre][year])
        } else {
            throw new Error("El año no existe")
        }
    } else {
        throw new Error("La empresa no existe")
    }
}

function proyeccionPorEmpresa(nombre){

    if (empresas[nombre]) {
        const empresaYears = Object.keys(empresas[nombre])
        const medianaYears = empresaYears.map(year => {
            return medianaPorEmpresa(nombre, year)
        })
        console.log(medianaYears)

        const incrSalario = []
        for(let i=0; i<medianaYears.length-1; i++){
            incrSalario.push((medianaYears[i+1]/medianaYears[i])-1)
        }
        console.log(incrSalario)

        const incrPromedio = PlatziMath.calcularMediana(incrSalario)
        console.log(incrPromedio)
        const ultimaMediana = medianaYears[medianaYears.length-1]
        const proyeccion = ultimaMediana * (1+incrPromedio)
        
        return proyeccion

    } else {
        throw new Error("La empresa no existe")
    }
}

// console.log(medianaPorEmpresa("Industrias Mokepon", 2022))
// console.log(proyeccionPorEmpresa("Industrias Mokepon"))


// Analisis general
function medianaGeneral() {
    const listaMedianas = salarios.map(
        persona => medianaPorPersona(persona.name))
    console.log(listaMedianas);
    
    const mediana = PlatziMath.calcularMediana(listaMedianas)
    return mediana
}

function medianaTop() {
    const listaMedianas = salarios.map(
        persona => medianaPorPersona(persona.name))
    
    PlatziMath.ordenarLista(listaMedianas)
    const top10 = Math.round(listaMedianas.length / 10)

    const listaTop10 = []
    for (let i = 0; i < top10; i++) {
        listaTop10.push(listaMedianas[listaMedianas.length-i-1])
    }
    console.log(listaTop10);
    return PlatziMath.calcularMediana(listaTop10)
}

// console.log(medianaGeneral())
console.log(medianaTop())