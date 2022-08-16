$(document).ready(function () {
    let productVideoGroups = []
    $('.video-fluid').each(function () {
        let productVideoSource = $(this).attr('src')
        let productVideoTag = $(this).attr('tag')
        let productVideoTitle = $(this).attr('title')
        if (productVideoTitle) {
        productVideoTitle = 'title="' + productVideoTitle + '" '
        } else {
            productVideoTitle = ''
        }

        $(this).
            wrap('<a class="boxedThumb ' + productVideoTag + '" ' +
                productVideoTitle + 'href="' + productVideoSource + '"></a>')

        var video = document.createElement( 'video' )
        video.setAttribute( 'class', 'video-fluid' )
        video.setAttribute( 'tag', productVideoTag )
        video.setAttribute( 'title', productVideoTitle )
        video.setAttribute( 'controls', '' )

        var source = document.createElement( 'source' )
        source.setAttribute( 'type', 'video/mp4' )
        source.setAttribute( 'src', productVideoSource )

        video.append(source)
        $(this).replaceWith(video)

        productVideoGroups.push('.' + productVideoTag)
    })
    jQuery.unique(productVideoGroups)
    productVideoGroups.forEach(productVideoGroupsSet)

    function productVideoGroupsSet (value) {
        $(value).simpleLightbox()
    }
})