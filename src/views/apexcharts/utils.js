export function getTooltipValue(data) {
    let tooltipText = '';
    console.log(Object.entries(data))
    for (const [key, value] of Object.entries(data)) {
        tooltipText += `<b>${formatLabel(key)}</b>: ${value}<br/>`;
    }
    return tooltipText
}

export function formatLabel(str) {
    return str
        .replace(/_/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, char => char.toUpperCase())
}

export function normalizePointSize(pointCnt) {
    const baseSize = 30;
    const minSize = 15;
    const maxSize = 60;
    const size = baseSize / Math.sqrt(pointCnt);
    return Math.min(maxSize, Math.max(minSize, size))
}

export function groupByColor(data, keys) {
    if (!data || data.length === 0) return [];
    console.log(keys.value[xAxisKey.value]);
    return props.data.map(d => ({
        value: [
            d[keys.value[xAxisKey.value]],
            d[keys.value[yAxisKey.value]],
        ],
        name: d.car,
        full: d
    }));
}