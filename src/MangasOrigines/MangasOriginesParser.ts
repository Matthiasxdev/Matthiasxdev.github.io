import {
  Chapter,
  ChapterDetails,
  HomeSection,
  LanguageCode,
  Manga,
  MangaStatus,
  MangaTile,
  Tag,
  TagSection
} from "paperback-extensions-common";


///////////////////////////////
/////    MANGA DETAILS    /////
///////////////////////////////

export const parseMangasOriginesDetails = ($: CheerioStatic, mangaId: string): Manga => {
  const panel = $('.container .tab-summary')
  const titles = [decodeHTMLEntity($('.container .post-title h1').text().trim())]
  const image =  encodeURI((($('img', panel).attr('srcset') ?? "").split(',').pop() ?? "").trim().split(' ')[0].replace(/-[1,2,3](\w)+x(\w)+/gm, ''))
  const rating = Number($('.post-total-rating .score', panel).text().trim())
  const desc = decodeHTMLEntity($('.manga-excerpt', panel).text().trim())
  const arrayTags: Tag[] = []

  let status = MangaStatus.UNKNOWN
  let author = "Unknown"
  let artist = undefined
  let hentai = false

  const infoContent = $('.post-content_item', panel).toArray()
  for (let info of infoContent) {
    let item = $('.summary-heading', info).text().trim().split(' ')[1]
    let val = $('.summary-content', info).text().trim()

    switch (item) {
      case "Rang":
        let nb_views = (val.match(/(\d+\.?\d*\w?) /gm) ?? "")[0].trim()
        const views = convertNbViews(nb_views)
        break;
      case "Alternatif":
        let otherTitles = val.split(',')
        for (let title of otherTitles) {
          titles.push(decodeHTMLEntity(title.trim()))
        }
        break;
      case "Auteur(s)":
        author = val
        break;
      case "Artiste(s)":
        artist = val
        break;
      case "Genre(s)":
        const tags = $('.summary-content .genres-content a', info).toArray()
        for (const tag of tags) {
          const label = capitalizeFirstLetter(decodeHTMLEntity($(tag).text()))
          const id = $(tag).attr('href')?.split("/")[4] ?? label
          if (['Adulte'].includes(label) || ['Hentai'].includes(label) || ['Sexe'].includes(label) || ['Uncensored'].includes(label)) {
            hentai = true
          }
          arrayTags.push({ id: id, label: label })
        }
        break;
      case "STATUS":
        switch (val.split(" ")[0].trim()) {
          case "Terminé":
            status = MangaStatus.COMPLETED
            break;
          case "En cours":
            status = MangaStatus.ONGOING
            break;
        }
        break;
    }
  }

  const tagSections: TagSection[] = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.length > 0 ? arrayTags.map(x => createTag(x)) : [] })];

  return createManga({
    id: mangaId,
    titles,
    image,
    author,
    artist,
    rating,
    status,
    tags: tagSections,
    desc,
    hentai
  })
}


///////////////////////////////
/////    CHAPTERS LIST    /////
///////////////////////////////

export const parseMangasOriginesChapters = ($: CheerioStatic, mangaId: string): Chapter[] => {
  const chapters: Chapter[] = []

  for (let chapter of $('.wp-manga-chapter').toArray()) {
    const id = $('a', chapter).first().attr('href') + "?style=list" ?? ''
    const name = decodeHTMLEntity($('a', chapter).first().text().trim()) != '' ? decodeHTMLEntity($('a', chapter).first().text().trim()) : undefined
    const chapNum = Number(($('a', chapter).first().text().trim().match(/(\d+)(\.?)(\d*)/gm) ?? '')[0])
    const time = parseDate($('.chapter-release-date i', chapter).text())

    chapters.push(createChapter({
      id,
      mangaId,
      name,
      langCode: LanguageCode.FRENCH,
      chapNum,
      time
    }))
  }
  return chapters
}


//////////////////////////////////
/////    CHAPTERS DETAILS    /////
//////////////////////////////////

export const parseMangasOriginesChapterDetails = ($: CheerioStatic, mangaId: string, chapterId: string): ChapterDetails => {
  const pages: string[] = []

  for (let item of $('.container .reading-content img').toArray()) {
    let page = encodeURI($(item).attr('src')!.trim())

    if (typeof page === 'undefined')
      continue;

    pages.push(page);
  }

  return createChapterDetails({
    id: chapterId,
    mangaId: mangaId,
    pages,
    longStrip: false
  })
}


////////////////////////
/////    Search    /////
////////////////////////

export const parseSearch = ($: CheerioStatic): MangaTile[] => {
  const manga: MangaTile[] = []

  for (const item of $('.row .c-tabs-item__content').toArray()) {
    const url = $('h3 a', item).attr('href')?.split('/')[4] ?? ''
    const title = $('h3 a', item).text() ?? ''
    const image = encodeURI((($('img', item).attr('srcset') ?? "").split(',').pop() ?? "").trim().split(' ')[0].replace(/-[1,3](\w)+x(\w)+/gm, ''))
    const subtitle = decodeHTMLEntity($('.latest-chap .chapter a', item).text())

    manga.push(createMangaTile({
      id: url,
      image,
      title: createIconText({ text: title }),
      subtitleText: createIconText({ text: subtitle })
    }))
  }

  return manga
}


///////////////////////////
/////    🔥 HOT 🔥    /////
///////////////////////////

const parseHotManga = ($: CheerioStatic): MangaTile[] => {
  const hotManga: MangaTile[] = []

  for (const item of $('.container .manga-slider .slider__container .slider__item').toArray()) {
    let url = $('h4 a', item).attr('href')?.split("/")[4]
    let image = encodeURI(($('img', item).attr('src') ?? "").trim())
    let title = decodeHTMLEntity($('h4', item).text().trim())

    if (typeof url === 'undefined' || typeof image === 'undefined')
      continue

    hotManga.push(createMangaTile({
      id: url,
      image: image,
      title: createIconText({ text: title })
    }))
  }

  return hotManga
}

////////////////////////////////
/////    LATEST UPDATED    /////
////////////////////////////////

const parseLatestUpdatedManga = ($: CheerioStatic): MangaTile[] => {
  const latestUpdatedManga: MangaTile[] = []

  for (const item of $('.page-content-listing.item-default .page-item-detail.manga').toArray()) {
    let url = $('h3 a', item).attr('href')?.split("/")[4]
    let image = encodeURI((($('img', item).attr('srcset') ?? "").split(',').pop() ?? "").trim().split(' ')[0].replace(/-[1,3](\w)+x(\w)+/gm, ''))
    let title = decodeHTMLEntity($('h3 a', item).text().trim())
    let subtitle = decodeHTMLEntity($('.chapter-item .chapter.font-meta', item).eq(0).text().trim())

    if (typeof url === 'undefined' || typeof image === 'undefined')
      continue

    latestUpdatedManga.push(createMangaTile({
      id: url,
      image: image,
      title: createIconText({ text: title }),
      subtitleText: createIconText({ text: subtitle })
    }))
  }

  return latestUpdatedManga
}

////////////////////////////////////
/////    ORIGINS EXCLUSIVES    /////
////////////////////////////////////

const parseOriginsExclusivesManga = ($: CheerioStatic): MangaTile[] => {
  const popularOriginsExclusives: MangaTile[] = []

  for (const item of $('#custom_html-5 .item').toArray()) {
    let url = $('h3 a', item).attr('href')?.split("/")[4]
    let image = encodeURI((($('img', item).attr('srcset') ?? "").split(',').pop() ?? "").trim().split(' ')[0].replace(/-[1,3](\w)+x(\w)+/gm, ''))
    let title = $('h3 a', item).text().trim()

    if (typeof url === 'undefined' || typeof image === 'undefined')
      continue

    popularOriginsExclusives.push(createMangaTile({
      id: url,
      image: image,
      title: createIconText({ text: title })
    }))
  }

  return popularOriginsExclusives
}

///////////////////////////////
/////    POPULAR TODAY    /////
///////////////////////////////

const parsePopularTodayManga = ($: CheerioStatic): MangaTile[] => {
  const popularTodayManga: MangaTile[] = []

  for (const item of $('.widget-content .popular-item-wrap').toArray()) {
    let url = $('h5 a', item).attr('href')?.split("/")[4]
    let image = encodeURI(($('img', item).attr('src') ?? "").trim().replace(/-[75]+x(\w)+/gm, ''))
    let title = decodeHTMLEntity($('h5 a', item).text().trim())
    let subtitle = decodeHTMLEntity($('.chapter-item .chapter.font-meta', item).eq(0).text().trim())

    if (typeof url === 'undefined' || typeof image === 'undefined')
      continue

    popularTodayManga.push(createMangaTile({
      id: url,
      image: image,
      title: createIconText({ text: title }),
      subtitleText: createIconText({ text: subtitle })
    }))
  }

  return popularTodayManga
}

/////////////////////////
/////    NOVELTY    /////
/////////////////////////

const parseNoveltyManga = ($: CheerioStatic): MangaTile[] => {
  const noveltyManga: MangaTile[] = []

  for (const item of $('#manga-popular-slider-3 .slider__container .slider__item').toArray()) {
    let url = $('h4 a', item).attr('href')?.split("/")[4]
    let image = encodeURI((($('img', item).attr('srcset') ?? "").split(',').pop() ?? "").trim().split(' ')[0].replace(/-[1,3](\w)+x(\w)+/gm, ''))
    let title = decodeHTMLEntity($('h4 a', item).text().trim())
    let subtitle = decodeHTMLEntity($('.chapter-item .chapter', item).eq(0).text().trim())

    if (typeof url === 'undefined' || typeof image === 'undefined')
      continue

    noveltyManga.push(createMangaTile({
      id: url,
      image: image,
      title: createIconText({ text: title }),
      subtitleText: createIconText({ text: subtitle })
    }))
  }

  return noveltyManga
}

//////////////////////////////
/////    HOME SECTION    /////
//////////////////////////////

export const parseHomeSections = ($: CheerioStatic, sections: HomeSection[], sectionCallback: (section: HomeSection) => void): void => {
  for (const section of sections) sectionCallback(section)
  const hotManga: MangaTile[] = parseHotManga($)
  const latestUpdatedManga: MangaTile[] = parseLatestUpdatedManga($)
  const originsExclusivesManga: MangaTile[] = parseOriginsExclusivesManga($)
  const popularTodayManga: MangaTile[] = parsePopularTodayManga($)
  const noveltyManga: MangaTile[] = parseNoveltyManga($)

  sections[0].items = hotManga
  sections[1].items = latestUpdatedManga
  sections[2].items = originsExclusivesManga
  sections[3].items = popularTodayManga
  sections[4].items = noveltyManga

  for (const section of sections) sectionCallback(section)
}

///////////////////////////
/////    VIEW MORE    /////
///////////////////////////

export const parseViewMore = ($: CheerioStatic): MangaTile[] => {
  const viewMore: MangaTile[] = []

  for (const item of $('.page-content-listing.item-default .page-item-detail.manga').toArray()) {
    let url = $('h3 a', item).attr('href')?.split("/")[4]
    let image = encodeURI((($('.img-responsive', item).attr('srcset') ?? "").split(',').pop() ?? "").trim().split(' ')[0].replace(/-[1,3](\w)+x(\w)+/gm, ''))
    let title = decodeHTMLEntity($('h3 a', item).text().trim())
    let subtitle = decodeHTMLEntity($('.chapter-item .chapter', item).eq(0).text().trim())

    if (typeof url === 'undefined' || typeof image === 'undefined')
      continue

    viewMore.push(createMangaTile({
      id: url,
      image: image,
      title: createIconText({ text: title }),
      subtitleText: createIconText({ text: subtitle })
    }))
  }

  return viewMore
}

/////////////////////////////////
/////    CHECK LAST PAGE    /////
/////////////////////////////////

export const isLastPage = ($: CheerioStatic): boolean => {
  return $('.error-404.not-found').length != 0
}


//////////////////////
/////    TAGS    /////
//////////////////////

export const parseTags = ($: CheerioStatic): TagSection[] => {
  const arrayTags: Tag[] = []

  for (let item of $('.search-advanced-form .checkbox').toArray()) {
    let id = $('input', item).attr('value') ?? ''
    let label = capitalizeFirstLetter(decodeHTMLEntity($('label', item).text().trim()))

    arrayTags.push({ id: id, label: label })
  }
  const tagSections: TagSection[] = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => createTag(x)) })]

  return tagSections
}


///////////////////////////////
/////    UPDATED MANGA    /////
///////////////////////////////

export interface UpdatedManga {
  ids: string[];
  loadMore: boolean;
}

export const parseUpdatedManga = ($: CheerioStatic, time: Date, ids: string[]): UpdatedManga => {
  const manga: string[] = []
  let loadMore = true

  for (const item of $('.page-content-listing.item-default .page-item-detail.manga').toArray()) {
    let id = ($('h3 a', item).attr('href') ?? '').split('/').slice(-2, -1)[0]
    let mangaTime = parseDate($('.post-on.font-meta', item).eq(0).find('a').attr('title') ?? '')

    if (mangaTime > time)
      if (ids.includes(id))
        manga.push(id)
      else loadMore = false
  }

  return {
    ids: manga,
    loadMore,
  }
}


/////////////////////////////////
/////    ADDED FUNCTIONS    /////
/////////////////////////////////

function decodeHTMLEntity(str: string) {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  })
}

function parseDate(str: string) {
  str = str.trim()
  if (str.length == 0) {
    let date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  if (/^(\d){1,2} (\D)+ (\d){4}$/.test(str)) {
    let date = str.split(' ')
    let year = date[2]
    let months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
    let month = months.findIndex((element) => element == date[1]).toString()
    let day = date[0]

    return new Date(parseInt(year), parseInt(month), parseInt(day))
  }
  else {
    let date = str.split(' ')
    let date_today = new Date()
    switch (date[1].slice(0, 2)) {
      case "s":
        return new Date(date_today.getFullYear(), date_today.getMonth(), date_today.getDate(), date_today.getHours(), date_today.getMinutes(), date_today.getSeconds() - parseInt(date[0]))
      case "mi":
        return new Date(date_today.getFullYear(), date_today.getMonth(), date_today.getDate(), date_today.getHours(), date_today.getMinutes() - parseInt(date[0]))
      case "he":
        return new Date(date_today.getFullYear(), date_today.getMonth(), date_today.getDate(), date_today.getHours() - parseInt(date[0]), date_today.getMinutes())
      case "jo":
        return new Date(date_today.getFullYear(), date_today.getMonth(), date_today.getDate() - parseInt(date[0]), date_today.getHours(), date_today.getMinutes())
      case "se":
        return new Date(date_today.getFullYear(), date_today.getMonth(), date_today.getDate() - (parseInt(date[0]) * 7), date_today.getHours(), date_today.getMinutes())
      case "mo":
        return new Date(date_today.getFullYear(), date_today.getMonth() - parseInt(date[0]), date_today.getDate(), date_today.getHours(), date_today.getMinutes())
      case "an":
        return new Date(date_today.getFullYear() - parseInt(date[0]), date_today.getMonth(), date_today.getDate(), date_today.getHours(), date_today.getMinutes())
    }
    return date_today
  }
}

function convertNbViews(str: string) {
  let views = undefined
  let number = parseInt((str.match(/(\d+\.?\d?)/gm) ?? "")[0])
  let unit = (str.match(/[a-zA-Z]/gm) ?? "")[0]

  switch (unit) {
    case "K":
      views = number * 1e3
      break;
    case "M":
      views = number * 1e6
      break;
    default:
      views = number
      break;
  }
  return Number(views)
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}