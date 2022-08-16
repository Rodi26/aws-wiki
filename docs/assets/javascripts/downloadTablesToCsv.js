function parse_emoji(data) {
    // Detect any emoji using a ragex
    // cf https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
    const regex = /\p{Extended_Pictographic}/gu

    if (regex.test(data)) {
        // Simple replace map to avoid emoji in the CSV
        // If you ever use another emoji, please update the replace map
        data = data.replace(regex, function (m) {
            return {
                '✔': 'OK',
                '⌛': 'On going',
                '📅': 'Planned',
                '🎯': 'Comitted',
                '📑': 'Backlog',
                '❌': 'Descoped',
            }[m];
        });
        // Remove trailling chars that did not match the replace mapping
        data = data.replace(/^\W+|\W+$/g, "");
    }
    return (data);
};

// Quick and simple export target #table_id into a csv
function download_table_as_csv(table_id, separator = ',') {
    // Select rows from table_id
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, ' - ').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Take care of the emoji used in the documentation
            data = parse_emoji(data);
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    // Download it
    var filename = 'ACID_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Format and download csv from S3 url
async function download_csv(name, url){
    var csv_file = await fetch_url(url).then(text => {
        return parse_emoji(text);
    });
    // Download it
    var filename = name + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_file));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function find_exportable_tables(latest_update, elem) {
    var csv_name = elem.getAttribute('data-export-name')
    var csv_url = elem.nextElementSibling.getAttribute('data-s3-table-url');
    // Create download buttons
    button = document.createElement("a");
    button.setAttribute("href", "#")
    button.setAttribute("onclick", `download_csv('${csv_name}', '${csv_url}');`)
    button.textContent = "💡 Download as CSV"
    if (latest_update !== undefined) { button.textContent += ' - ' + latest_update }
    elem.appendChild(button)
}
