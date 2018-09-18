module.exports = {}

module.exports.pad = function pad(text, width, toLeft) {

    var text = text + ""

    var padding = width - text.length

    if (padding > 0) {

        return toLeft
            ? " ".repeat(padding).concat(text)
            : text.concat(" ".repeat(padding))
    }
    else if (padding < 0) { return text.slice(0, width) }
    else { return text }
}