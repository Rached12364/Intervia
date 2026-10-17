import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconName =
  | 'dashboard'
  | 'videocam'
  | 'videocam_off'
  | 'quiz'
  | 'help_outline'
  | 'code'
  | 'work'
  | 'work_outline'
  | 'bar_chart'
  | 'pie_chart'
  | 'analytics'
  | 'admin_panel_settings'
  | 'person'
  | 'people'
  | 'profil'
  | 'logout'
  | 'shield'
  | 'verified_user'
  | 'verified'
  | 'check'
  | 'check_circle'
  | 'checklist'
  | 'fact_check'
  | 'cloud_upload'
  | 'file_download'
  | 'download_done'
  | 'description'
  | 'file'
  | 'file_text'
  | 'javascript'
  | 'lightbulb'
  | 'handshake'
  | 'privacy_tip'
  | 'psychology'
  | 'stars'
  | 'military_tech'
  | 'workspace_premium'
  | 'emoji_events'
  | 'terminal'
  | 'timeline'
  | 'trending_up'
  | 'timer'
  | 'schedule'
  | 'school'
  | 'search'
  | 'search_off'
  | 'self_improvement'
  | 'smart_toy'
  | 'tune'
  | 'business'
  | 'place'
  | 'payments'
  | 'info'
  | 'error_outline'
  | 'arrow_forward'
  | 'arrow_back'
  | 'chevron_right'
  | 'chevron_left'
  | 'chevron_down'
  | 'close'
  | 'add'
  | 'refresh'
  | 'replay'
  | 'restart_alt'
  | 'save'
  | 'send'
  | 'play'
  | 'play_arrow'
  | 'play_circle'
  | 'edit_note'
  | 'trash'
  | 'linkedin'
  | 'cloud_off'
  | 'inbox'
  | 'history'
  | 'badge'
  | 'recent_actors'
  | 'record_voice_over'
  | 'auto_awesome'
  | 'sync'
  | 'task_alt'
  | 'wifi'
  | 'wifi_off'
  | 'mic'
  | 'mic_off'
  | 'spa'
  | 'favorite'
  | 'face'
  | 'sparkles'
  | 'chip'
  | 'network_nodes'
  | 'robot'
  | 'audio_wave'
  | 'circuit_brain'
  | 'cv_check'
  | 'chat_bubble'
  | 'score_bars'
  | 'visibility'
  | 'visibility_off';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.aria-hidden]="ariaLabel ? null : 'true'"
      [attr.aria-label]="ariaLabel || null"
      [attr.role]="ariaLabel ? 'img' : null"
      class="app-icon">
      @switch (name) {
        @case ('dashboard') {
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        }
        @case ('videocam') {
          <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
          <rect x="2" y="6" width="14" height="12" rx="2" />
        }
        @case ('videocam_off') {
          <path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.223-3.482a.5.5 0 0 1 .777.416v8.132" />
          <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
          <line x1="2" x2="22" y1="2" y2="22" />
        }
        @case ('quiz') {
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        }
        @case ('help_outline') {
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        }
        @case ('code') {
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        }
        @case ('work') {
          <rect width="20" height="14" x="2" y="7" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        }
        @case ('work_outline') {
          <rect width="20" height="14" x="2" y="7" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        }
        @case ('bar_chart') {
          <line x1="12" x2="12" y1="20" y2="10" />
          <line x1="18" x2="18" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="16" />
        }
        @case ('pie_chart') {
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        }
        @case ('analytics') {
          <line x1="18" x2="18" y1="20" y2="10" />
          <line x1="12" x2="12" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="14" />
        }
        @case ('admin_panel_settings') {
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        }
        @case ('person') {
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        }
        @case ('people') {
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        }
        @case ('profil') {
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        }
        @case ('logout') {
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        }
        @case ('shield') {
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        }
        @case ('verified_user') {
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        }
        @case ('verified') {
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        }
        @case ('check') {
          <polyline points="20 6 9 17 4 12" />
        }
        @case ('check_circle') {
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        }
        @case ('checklist') {
          <rect width="8" height="4" x="8" y="2" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        }
        @case ('fact_check') {
          <rect width="8" height="4" x="8" y="2" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        }
        @case ('cloud_upload') {
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M12 12v9" />
          <path d="m16 16-4-4-4 4" />
        }
        @case ('file_download') {
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        }
        @case ('download_done') {
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="9 11 12 14 22 4" />
        }
        @case ('description') {
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <line x1="10" x2="8" y1="9" y2="9" />
        }
        @case ('file') {
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        }
        @case ('file_text') {
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
        }
        @case ('javascript') {
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m10 13-2 2 2 2" />
          <path d="m14 17 2-2-2-2" />
        }
        @case ('lightbulb') {
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        }
        @case ('handshake') {
          <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L13 12.4" />
          <path d="m18 11 2-2a2 2 0 0 0 0-2.8l-1.4-1.4a2 2 0 0 0-2.8 0L14 6.6" />
          <path d="m6 13 4.2-4.2a2 2 0 0 1 2.8 0l1.4 1.4" />
          <path d="m2 17 3.3-3.3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4L6 21a2 2 0 0 1-2.8 0L2 19.8A2 2 0 0 1 2 17z" />
        }
        @case ('privacy_tip') {
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        }
        @case ('psychology') {
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
          <path d="M12 18v4" />
          <path d="M12 2v3" />
        }
        @case ('stars') {
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        }
        @case ('military_tech') {
          <circle cx="12" cy="15" r="6" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        }
        @case ('workspace_premium') {
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        }
        @case ('emoji_events') {
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        }
        @case ('terminal') {
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" x2="20" y1="19" y2="19" />
        }
        @case ('timeline') {
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        }
        @case ('trending_up') {
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        }
        @case ('timer') {
          <line x1="10" x2="14" y1="2" y2="2" />
          <line x1="12" x2="15" y1="14" y2="11" />
          <circle cx="12" cy="14" r="8" />
        }
        @case ('schedule') {
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        }
        @case ('school') {
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        }
        @case ('search') {
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        }
        @case ('search_off') {
          <path d="m2 2 20 20" />
          <path d="M11 5a6 6 0 0 1 6 6m-.5 5.5A6 6 0 0 1 5.5 10.5" />
        }
        @case ('self_improvement') {
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        }
        @case ('smart_toy') {
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        }
        @case ('tune') {
          <line x1="21" x2="14" y1="4" y2="4" />
          <line x1="10" x2="3" y1="4" y2="4" />
          <line x1="21" x2="12" y1="12" y2="12" />
          <line x1="8" x2="3" y1="12" y2="12" />
          <line x1="21" x2="16" y1="20" y2="20" />
          <line x1="12" x2="3" y1="20" y2="20" />
          <line x1="14" x2="14" y1="2" y2="6" />
          <line x1="8" x2="8" y1="10" y2="14" />
          <line x1="16" x2="16" y1="18" y2="22" />
        }
        @case ('business') {
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
          <path d="M10 6h4" />
          <path d="M10 10h4" />
          <path d="M10 14h4" />
          <path d="M10 18h4" />
        }
        @case ('place') {
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" />
        }
        @case ('payments') {
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        }
        @case ('info') {
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        }
        @case ('error_outline') {
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        }
        @case ('arrow_forward') {
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        }
        @case ('arrow_back') {
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        }
        @case ('chevron_right') {
          <path d="m9 18 6-6-6-6" />
        }
        @case ('chevron_left') {
          <path d="m15 18-6-6 6-6" />
        }
        @case ('chevron_down') {
          <path d="m6 9 6 6 6-6" />
        }
        @case ('close') {
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        }
        @case ('add') {
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        }
        @case ('refresh') {
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M8 16H3v5" />
        }
        @case ('replay') {
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        }
        @case ('restart_alt') {
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        }
        @case ('save') {
          <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
          <path d="M7 3v4a1 1 0 0 0 1 1h7" />
        }
        @case ('send') {
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        }
        @case ('play') {
          <polygon points="6 3 20 12 6 21 6 3" />
        }
        @case ('play_arrow') {
          <polygon points="6 3 20 12 6 21 6 3" />
        }
        @case ('play_circle') {
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        }
        @case ('edit_note') {
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        }
        @case ('trash') {
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        }
        @case ('linkedin') {
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        }
        @case ('cloud_off') {
          <path d="m2 2 20 20" />
          <path d="M5.782 5.782A7 7 0 0 0 4 14.9A4.5 4.5 0 0 0 8.5 19h9a4.5 4.5 0 0 0 1.94-.44" />
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 0 0 9.17 4.17" />
        }
        @case ('inbox') {
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        }
        @case ('history') {
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <polyline points="12 7 12 12 15 15" />
        }
        @case ('badge') {
          <path d="M16 2v2" />
          <path d="M7 2v2" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <circle cx="12" cy="11" r="3" />
          <path d="M7 18a5 5 0 0 1 10 0" />
        }
        @case ('recent_actors') {
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 19v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        }
        @case ('record_voice_over') {
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        }
        @case ('auto_awesome') {
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
        }
        @case ('sync') {
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M8 16H3v5" />
        }
        @case ('task_alt') {
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        }
        @case ('wifi') {
          <path d="M12 20h.01" />
          <path d="M2 8.82a15 15 0 0 1 20 0" />
          <path d="M5 12.859a10 10 0 0 1 14 0" />
          <path d="M8.5 16.429a5 5 0 0 1 7 0" />
        }
        @case ('wifi_off') {
          <path d="M12 20h.01" />
          <path d="M8.5 16.429a5 5 0 0 1 7 0" />
          <path d="M2 2 22 22" />
          <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
          <path d="M13.41 10.41a10 10 0 0 1 5.59 2.45" />
          <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
          <path d="M10.66 5a15 15 0 0 1 11.34 3.82" />
        }
        @case ('mic_off') {
          <line x1="2" x2="22" y1="2" y2="22" />
          <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
          <path d="M5 10v2a7 7 0 0 0 12 5" />
          <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
          <line x1="12" x2="12" y1="19" y2="22" />
        }
        @case ('visibility') {
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        }
        @case ('visibility_off') {
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
          <line x1="2" x2="22" y1="2" y2="22" />
        }
        @case ('mic') {
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        }
        @case ('spa') {
          <path d="M12 22C12 22 4 17 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10C20 17 12 22 12 22Z" />
          <path d="M12 2V22" />
          <path d="M12 12C9 10 7 10 4 10" />
          <path d="M12 16C15 14 17 14 20 14" />
        }
        @case ('favorite') {
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        }
        @case ('face') {
          <circle cx="12" cy="12" r="10" />
          <circle cx="9" cy="10" r="1" />
          <circle cx="15" cy="10" r="1" />
          <path d="M8 15a4 4 0 0 0 8 0" />
        }
        @case ('sparkles') {
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          <path d="m4.93 4.93 2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        }
        @case ('chip') {
          <rect width="12" height="12" x="6" y="6" rx="2" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        }
        @case ('network_nodes') {
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
          <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
          <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
        }
        @case ('robot') {
          <rect width="14" height="12" x="5" y="7" rx="2" />
          <line x1="12" y1="2" x2="12" y2="7" />
          <circle cx="12" cy="2" r="1" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
          <line x1="9" y1="15" x2="15" y2="15" />
          <line x1="2" y1="13" x2="5" y2="13" />
          <line x1="19" y1="13" x2="22" y2="13" />
        }
        @case ('audio_wave') {
          <line x1="3" y1="12" x2="3" y2="12" />
          <line x1="7" y1="8" x2="7" y2="16" />
          <line x1="11" y1="4" x2="11" y2="20" />
          <line x1="15" y1="7" x2="15" y2="17" />
          <line x1="19" y1="10" x2="19" y2="14" />
          <line x1="22" y1="12" x2="22" y2="12" />
        }
        @case ('circuit_brain') {
          <path d="M12 4a4 4 0 0 0-4 4c0 1.3.6 2.5 1.5 3.2L9 15h6l-.5-3.8A4 4 0 0 0 16 8a4 4 0 0 0-4-4Z" />
          <path d="M9 18h6M10 21h4" />
          <circle cx="12" cy="9" r="1" />
          <line x1="9" y1="9" x2="11" y2="9" />
          <line x1="13" y1="9" x2="15" y2="9" />
        }
        @case ('cv_check') {
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        }
        @case ('chat_bubble') {
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="13" y2="13" />
        }
        @case ('score_bars') {
          <line x1="4" y1="20" x2="20" y2="20" />
          <line x1="7" y1="20" x2="7" y2="15" />
          <line x1="12" y1="20" x2="12" y2="9" />
          <line x1="17" y1="20" x2="17" y2="4" />
          <polyline points="7 13 12 7 17 2" />
        }
        @default {
          <!-- Fallback generic circle -->
          <circle cx="12" cy="12" r="9" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        }
      }
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      line-height: 1;
      flex-shrink: 0;
    }
    .app-icon {
      display: block;
      color: inherit;
      transition: stroke var(--transition-fast, 150ms ease);
    }
  `]
})
export class IconComponent {
  @Input() name: IconName | string = 'info';
  @Input() size: number | string = 20;
  @Input() ariaLabel?: string;
}
