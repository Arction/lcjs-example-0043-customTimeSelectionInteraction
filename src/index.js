const lcjs = require('@lightningchart/lcjs')
const { lightningChart, AxisTickStrategies, emptyFill, AutoCursorModes, IndividualPointFill, Themes } = lcjs

const lc = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
const chart = lc
    .ChartXY({
        defaultAxisX: { type: 'linear-highPrecision' },
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle('Custom data selection interaction (drag with left mouse above chart)')
const axisX = chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime).setAnimationScroll(false)

// Disable conflicting built-in interactions
chart.setUserInteractions({ rectangleZoom: false })

// Generate random data for example
const data = []
let yPrev = 100
for (let i = 0; i < 1000; i += 1) {
    const x = Date.UTC(2023, 0, i)
    const y = yPrev + (Math.random() * 2 - 1)
    const id = i
    yPrev = y
    data.push({ x, y, id })
}

const lineSeries = chart
    .addPointLineAreaSeries({
        dataPattern: 'ProgressiveX',
        colors: true,
        ids: true,
    })
    .appendJSON(data, { x: 'x', y: 'y', id: 'id' })
    .setPointerEvents(false)
const colorNormal = lineSeries.getStrokeStyle().getFillStyle().getColor()
const colorUnselected = chart.getTheme().examples.unfocusedDataColor
const colorSelected = chart.getTheme().examples.positiveFillStyle.getColor()
lineSeries
    .setAreaFillStyle(emptyFill)
    .setStrokeStyle((stroke) => stroke.setFillStyle(new IndividualPointFill()))
    .fill({ color: colorNormal })

// Setup custom user interaction
const band = axisX.addBand(false).setVisible(false)
chart.seriesBackground.addEventListener('pointerdown', (event) => {
    const locAxis = chart.translateCoordinate(event, chart.coordsAxis)
    band.setVisible(true)
    band.setValueStart(locAxis.x).setValueEnd(locAxis.x)
    chart.setCursorMode(undefined)
    const handleMove = (event) => {
        const locAxis = chart.translateCoordinate(event, chart.coordsAxis)
        band.setValueEnd(locAxis.x)
    }
    const handleUp = (event) => {
        band.setVisible(false)
        chart.setCursorMode('show-nearest')
        // Highlight all data points inside band
        const xMin = Math.min(band.getValueStart(), band.getValueEnd())
        const xMax = Math.max(band.getValueStart(), band.getValueEnd())
        // NOTE: In this example, could just as well use `data` variable directly. But showing use of `readback` for example purposes.
        const dataSet = lineSeries.readBack()
        const idsInsideBand = []
        for (let i = 0; i < dataSet.xValues.length; i += 1) {
            const x = dataSet.xValues[i]
            if (x >= xMin && x <= xMax) idsInsideBand.push(dataSet.ids[i])
        }
        lineSeries.fill({ color: colorUnselected }).alterSamplesByID(idsInsideBand, { color: colorSelected })
        document.body.removeEventListener('pointermove', handleMove)
        document.body.removeEventListener('pointerup', handleUp)
    }
    document.body.addEventListener('pointermove', handleMove)
    document.body.addEventListener('pointerup', handleUp)
})
