export interface Site {
    id: string;
    name: string;
    slug: string;
    unit_id: string;
    active: boolean;
    live: boolean;
    customer_login: boolean;
}

// Represents the entire response from the API endpoint.
export interface SitesResponse {
    status: string;
    request_time: number;
    records: number;
    sites: Site[];
}

// Represents the status object for each location.
export interface Status {
    label: string;
    message: string;
    color: string;
}

// Represents the address object for each location.
export interface Address {
    street: string;
    metadata: string | null;
    city: string;
    state: string;
    zip_code: string;
    lat: number;
    lon: number;
    phone: string | null;
    dst: boolean;
    gmt: number;
    phone_formatted: string | null;
    ext_formatted: string | null;
    gmt_offset: number;
    coordinates: [number, number];
    manual_coords: (number | null)[];
    abbreviation: string | null;
    zone_name: string | null;
}

// Represents each location in the locations array.
export interface Location {
    id: string;
    name: string;
    open: boolean;
    status: Status;
    occupancy: string;
    address: Address | null;
}

// Represents the entire response from the /locations/status endpoint.
export interface LocationsStatusResponse {
    status: string;
    request_time: number;
    records: number;
    locations: Location[];
}

// Represents individual nutrient information.
interface Nutrient {
    id: string;
    name: string;
    value: string;
    uom: string;
    value_numeric: string;
}

// Represents individual filter information (allergens, labels).
interface Filter {
    id: string;
    name: string;
    type: string;
    icon: boolean;
    remote_file_name: string | null;
    sector_icon_id: string | null;
    //@ts-ignore
    custom_icons: any[];
}

// Represents a single menu item with its details.
export interface MenuItem {
    id: string;
    name: string;
    mrn: number;
    rev: string | null;
    mrn_full: string;
    desc: string | null;
    webtrition_id: string | null;
    sort_order: number;
    portion: string;
    qty: string | null;
    ingredients: string;
    nutrients: Nutrient[];
    filters: Filter[];
    custom_allergens: never | null;
    calories: string;
    //
    category_id: string;
    period_id: string;
}

// Represents categories within a menu period.
interface Category {
    id: string;
    name: string;
    sort_order: number;
    items: MenuItem[];
}

// Represents menu periods (e.g., Breakfast, Lunch).
interface Period {
    id: string;
    sort_order: number;
    name: string;
}

// Represents the menu object with all periods and their categories.
interface Menu {
    id: number;
    date: string;
    name: string | null;
    from_date: string | null;
    to_date: string | null;
    periods: {
        name: string;
        id: string;
        sort_order: number;
        categories: Category[];
    }[];
}

// Represents the top-level structure of the API response.
export interface LocationPeriodsResponse {
    status: string;
    request_time: number;
    records: number;
    allergen_filter: boolean;
    menu: Menu;
    periods: Period[];
    closed: boolean;
}

// make this a module
export {};

// Site info types
export type SiteInfoResponse = {
    status: string;
    request_time: number;
    records: number;
    logo_exists: boolean;
    perform_redirect: boolean;
    site: {
        id: string;
        name: string;
        slug: string;
        unit_id: string;
        avoiding_gluten: boolean;
        allergen_filter: boolean;
        webtrition_version: number;
        custom_allergens: boolean;
        allergen_card: boolean;
        prelaunch: boolean;
        require_student_id: boolean;
        public_platform: boolean;
        custom_locations: boolean;
        print_platform: boolean;
        food_insecurity: boolean;
        location_images: boolean;
        use_reservations: boolean;
        doc_pin: boolean;
        test_mode: boolean;
        sector_id: string;
        transparent_header: boolean;
        text_color: string;
        brand_color: string;
        social_media: {
            facebook: string;
            pinterest: string;
            instagram: string;
            youtube: string;
            flickr: string;
            vimeo: string;
            x: string;
        };
        customer_login: boolean;
        display_email: boolean;
        email: string | null;
        url: string;
        published: boolean;
        legacy_menus: boolean;
        integrated_gateway: boolean;
        link_to_school: string | null;
        notifications: boolean;
        meal_plan_subscriptions: boolean;
        mpp_sso: boolean;
        pork_icon: boolean;
        sodium_warning: boolean;
        wcag: string;
        balanced_u_icon: boolean;
        accessibility_link: boolean;
        accessibility_url: string | null;
        extra_nav: boolean;
        display_landing_modal: boolean;
        landing_modal_copy: string | null;
        landing_modal_filename: string | null;
        custom_domain: string | null;
        accessibility_header: string | null;
        weekly_mpp_subscriptions: boolean;
        carousel_control: boolean;
        shop_pay_with_sid: boolean;
        show_homepage_alert: boolean;
        coffee_subscription: boolean;
        local_date: string;
        events_published: boolean;
        recharge: boolean;
        map_tile: boolean;
        show_map_tile: boolean;
        cross_platform_banner: boolean;
        shop_link: boolean;
        display_cal: boolean;
        active_promo_code: boolean;
        show_closed_locations: boolean;
        howgood_icons: boolean;
        howgood_icons_new: boolean;
        script_url: string | null;
        use_script: boolean;
        mobile: boolean;
        interim_ui: boolean;
        webtrition_search: boolean;
        multi_campus: boolean;
        customer_login_text: string;
        use_customer_login_text: boolean;
        unit_accessibility_link: string | null;
        unit_accessibility_link_text: string;
        use_unit_accessibility_link: boolean;
        unit_privacy_link: string | null;
        unit_privacy_link_text: string;
        use_unit_privacy_link: boolean;
        display_allergens: boolean;
        show_on_the_go: boolean;
        club_eats_week: boolean;
        homepage_alerts: never[];
        section_list: {
            name: string;
            id: string;
            slug: string;
            master_slug: string | null;
            is_url: boolean;
            url: string | null;
            published: boolean;
            sort_order: number;
            microsite_landing: boolean;
            nodes: {
                name: string;
                id: string;
                slug: string;
                master_slug: string | null;
                is_url: boolean;
                url: string | null;
                published: boolean;
                start: string;
                end: string;
                scheduled: boolean;
                microsite_landing: boolean;
                master_section_id: string;
                global_section_id: string;
                no_robots: boolean;
                use_banner: boolean;
                banner: {
                    _id: string;
                    created_at: string;
                    created_by: string | null;
                    created_ip: string | null;
                    file_height: number;
                    file_name: string;
                    file_path: string | null;
                    file_size: number;
                    file_width: number;
                    image_id: string | null;
                    original_file: string;
                    section_id: string;
                    site_id: string | null;
                    sort_order: number;
                    thumb_height: number;
                    thumb_name: string;
                    thumb_path: string | null;
                    thumb_size: number;
                    thumb_width: number;
                    updated_at: string;
                } | null;
                banner_text_align: string;
                banner_text_font: string;
            }[];
        }[];
        tiles: {
            id: string;
            name: string;
            order: number;
        }[];
        address: {
            id: string;
            street: string;
            metadata: string | null;
            city: string;
            state: string;
            zip_code: string;
            lat: number;
            lon: number;
            phone: string;
            dst: boolean;
            gmt: number;
            phone_formatted: string;
            ext_formatted: string | null;
            gmt_offset: number;
            coordinates: number[];
            manual_coords: any[];
            abbreviation: string;
            zone_name: string;
        };
        homepage_images: {
            id: string;
            file_name: string;
            alt: string | null;
            file_size: number;
            created_at: string;
            file_width: number;
            file_height: number;
            thumb_name: string | null;
            active: boolean;
            caption: string | null;
            caption_color: string;
            sort_order: number;
            link: string | null;
        }[];
        site_logo: {
            id: string;
            file_name: string;
            logo_alt_text: string;
        };
        dining_map: any;
    };
};
