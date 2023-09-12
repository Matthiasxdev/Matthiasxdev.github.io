import {
    ContentRating,
    SourceInfo,
    BadgeColor,
    SourceIntents
} from '@paperback/types'

import {
    Madara
} from '../templates/Madara/Madara'


const DOMAIN: string = 'https://manga-scantrad.io'

export const MangaScantradInfo: SourceInfo = {
    version: "2.0",
    language: "FR",
    name: 'MangaScantrad',
    icon: 'icon.png',
    description: `Extension that pulls mangas from ${DOMAIN}`,
    author: 'Moomooo95',
    authorWebsite: 'https://github.com/Moomooo95',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: DOMAIN,
    sourceTags: [
        {
            text: 'FR',
            type: BadgeColor.GREY
        },
    ],
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.CLOUDFLARE_BYPASS_REQUIRED
}

export class MangaScantrad extends Madara {
    base_url = DOMAIN
    lang_code = MangaScantradInfo.language!
    override date_format: string = "DD MMMM YYYY"
    override alt_ajax: boolean = true
    override cloudflare_domain: boolean = false
    override description_selector: string = "div.description-summary"

    override genres_condition_filter_or: string = "OU (ayant un des genres sélectionnés)"
    override genres_condition_filter_and: string = "ET (ayant tous les genres sélectionnés)"

    override adult_filter_all: string = "Tout"
    override adult_filter_none: string = "Aucun Contenu pour Adulte"
    override adult_filter_only: string = "Uniquement du Contenu pour Adulte"

    override status_filter_ongoing: string = "En Cours"
    override status_filter_completed: string = "Terminé"
    override status_filter_cancelled: string = "Annulé"
    override status_filter_on_hold: string = "En Pause"
}