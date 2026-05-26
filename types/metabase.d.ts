declare namespace JSX {
  interface IntrinsicElements {
    'metabase-dashboard': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        token?: string
        'with-title'?: string
        'with-downloads'?: string
      },
      HTMLElement
    >
  }
}

interface Window {
  metabaseConfig?: Record<string, unknown>
  defineMetabaseConfig?: (config: Record<string, unknown>) => void
}
