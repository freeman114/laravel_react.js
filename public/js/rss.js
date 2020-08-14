const parser = new RSSParser();

function getRssItemHTMLContent(entry) {
    const temp = document.createElement('template');
    const url = new URL(entry.link);
    const date = new Date(entry.isoDate);

    temp.innerHTML = `
        <div class="rss-item">
            <a class="rss-item__title" href="${entry.link}">${entry.title}</a>
            <div class="rss-item__footer">
                Source: ${url.hostname} | Published on ${date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()}
            </div>
        </div>
    `;
    return temp.content;
}

parser.parseURL('/api/plugin/rss', function(err, feed) {
    if (err) throw err;
    const rssRoot = document.getElementById('rss');
    feed.items.forEach(function(entry) {
        rssRoot.appendChild(getRssItemHTMLContent(entry));
    })
});
