/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SubReddit {
  kind: string;
  data: {
    approved_at_utc: null | number;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: null | string;
    gilded: number;
    clicked: boolean;
    title: string;
    link_flair_richtext: { e: string; t: string }[];
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    link_flair_css_class: string | null;
    downs: number;
    thumbnail_height: number;
    top_awarded_type: null | string;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color: string;
    upvote_ratio: number;
    author_flair_background_color: null | string;
    ups: number;
    total_awards_received: number;
    media_embed: Record<string, any>;
    thumbnail_width: number;
    author_flair_template_id: null | string;
    is_original_content: boolean;
    user_reports: any[];
    secure_media: null | string;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category: null | string;
    secure_media_embed: Record<string, any>;
    link_flair_text: string;
    can_mod_post: boolean;
    score: number;
    approved_by: null | string;
    is_created_from_ads_ui: boolean;
    author_premium: boolean;
    thumbnail: string;
    edited: boolean;
    author_flair_css_class: null | string;
    author_flair_richtext: any[];
    gildings: Record<string, any>;
    post_hint: 'link' | string;
    content_categories: null | string;
    is_self: boolean;
    subreddit_type: 'public' | string;
    created: number;
    link_flair_type: 'richtext' | string;
    wls: number;
    removed_by_category: null | string;
    banned_by: null | string;
    author_flair_type: 'text' | string;
    domain: string;
    allow_live_comments: boolean;
    selftext_html: null | string;
    likes: null | string;
    suggested_sort: null | string;
    banned_at_utc: null | string;
    url_overridden_by_dest: string;
    view_count: null | string;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    preview: {
      images: {
        source: { url: string; width: number; height: number };
        resolutions: { url: string; width: number; height: number }[];
        variants: Record<string, any>;
        id: string;
      }[];
      enabled: boolean;
    };
    all_awardings: any[];
    awarders: any[];
    media_only: boolean;
    link_flair_template_id: string;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text: null | string;
    treatment_tags: any[];
    visited: boolean;
    removed_by: null | string;
    mod_note: null | string;
    distinguished: null | string;
    subreddit_id: string;
    author_is_blocked: boolean;
    mod_reason_by: null | string;
    num_reports: null | string;
    removal_reason: null | string;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    report_reasons: null | string;
    author: string;
    discussion_type: null | string;
    num_comments: number;
    send_replies: boolean;
    whitelist_status: 'all_ads' | string;
    contest_mode: boolean;
    mod_reports: any[];
    author_patreon_flair: boolean;
    author_flair_text_color: null | string;
    permalink: string;
    parent_whitelist_status: 'all_ads' | string;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    media: null | string;
    is_video: boolean;
  };
}
