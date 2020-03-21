import { pathDataToPolys } from './svg-path-to-polygon.js';

const zoom  = 1;

function stringify(element) {
    let obj = {};
    obj.name = element.localName;
    obj.attributes = [];
    obj.children = [];
    Array.from(element.attributes).forEach(a => {
        obj.attributes.push({ name: a.name, value: a.value });
    });
    Array.from(element.children).forEach(c => {
        obj.children.push(stringify(c));
    });

    return obj;
}

function getSvgPath(svgxml) {
    let parser = new DOMParser();
    let xml = parser.parseFromString(svgxml, 'text/xml');
    xml = xml.getElementsByTagName("svg")[0].valueOf();
    var pathInfo = '';
    let pathObject = {};
    stringify(xml).children.forEach( (elem) => {
        if (elem.name === "path") {
            elem.attributes.forEach( (attr) => {
                if (attr.name === "d")
                    pathInfo += attr.value;
            })
        }
    });
    if (pathInfo === '') {
        stringify(xml).children.forEach( (elem) => {
            if (elem.name === "g") {
                elem.attributes.forEach( (path) => {
                    if (path.name === "path") {
                        path.attributes.forEach( (d) => {
                            if (d.name === "d") {
                                pathInfo += d.value;
                            }
                        })
                    }
                })
            }
        });

    }

    return pathInfo;
}

function svgHeader() {
    return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 300 450">' +
        '<path id="renderedpath" fill="none" stroke="black" stroke-width="1" d="';
}

function svgFooter() {
    return '"></path></svg>';
}

export function createSvg(plotterformat) {
    let svg = '';
    svg = svgHeader() + plotterformat + svgFooter();

    return svg;
}

export function convertSvgToPlotterformat(svgxml) {
    let path2polyPoints = pathDataToPolys(getSvgPath(svgxml), {tolerance:1, decimals:1});
    //relative
    let lines = [];
    let lastPoint = {x: 0,y: 0};
    path2polyPoints.forEach( line  => {
        let points = [];
        line.forEach(point => {
            point.x = (parseFloat(point[0]) - lastPoint.x) * zoom;
            point.y = (parseFloat(point[1]) - lastPoint.y) * zoom;
            lastPoint.x = parseFloat(point[0]);
            lastPoint.y = parseFloat(point[1]);
            points.push(point);
        });
        lines.push(points);
    });

    let newPath = "";
    lines.forEach( line => {
        newPath += "m\n";
        line.forEach(point => {
            newPath += point.x + "," + point.y + "\n";
        });
    });

    return newPath;
}
