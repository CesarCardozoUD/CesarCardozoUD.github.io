import { check_boxes } from './enums.js'

const streak_habit = (name, history) => {
    const isolated_habit_history = history.filter(item => item.checks[name] == true);
    let fechas = []
    isolated_habit_history.forEach(element => {
        fechas.push(element.update_date)
    });
    return analizarFechas(fechas)
}

function analizarFechas(lista) {

    console.log(lista)

    if(lista.length === 0){
        return {
            rachaMasLarga: 0,
            diasDesdeUltima: 0
        };
    }

    const dates = lista.map(f => {
        const [d, m, y] = f.split("/").map(Number);
        return new Date(y, m - 1, d);
    });

    dates.sort((a, b) => a - b);

    let maxRacha = 1;
    let rachaActual = 1;

    for (let i = 1; i < dates.length; i++) {
        const diff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
            rachaActual++;
            maxRacha = Math.max(maxRacha, rachaActual);
        } else {
            rachaActual = 1;
        }
    }

    rachaActual = 1;

    for (let i = dates.length - 1; i >= 0; i--) {
        const diff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
            rachaActual++;
        } else {
            break;
        }
    }

    return {
        rachaMasLarga: maxRacha,
        diasDesdeUltima: rachaActual
    };
}

export { streak_habit } 