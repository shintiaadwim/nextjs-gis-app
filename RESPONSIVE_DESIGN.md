# Responsive Design Documentation

## Gambaran Umum

Project **Carbon-Loss Tracker** telah dioptimalkan untuk responsif di semua perangkat:

- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px+

## Tailwind Breakpoints yang Digunakan

```
sm: 640px   - Tablet kecil
md: 768px   - Tablet sedang
lg: 1024px  - Desktop kecil
xl: 1280px  - Desktop besar
```

## Perbaikan Responsif yang Dilakukan

### 1. **Hero Section (HomePage.tsx)**

- ✅ Typography scaling: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- ✅ Padding responsif: `p-5 sm:p-8 md:p-10 lg:p-12`
- ✅ Gap spacing: `gap-4 sm:gap-6 md:gap-8`
- ✅ Button sizing: `px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm`
- ✅ Status box responsif: `rounded-2xl sm:rounded-3xl px-5 sm:px-6`

### 2. **Analytics Page (AnalyticsPageContent.tsx)**

- ✅ Hero section responsif dengan typography scaling
- ✅ Grid layout: `grid-cols-1` pada mobile, optimal pada desktop
- ✅ Margin & padding responsif di semua breakpoints

### 3. **Sidebar Layout (SidebarLayout.tsx)**

- ✅ Touch targets: minimum 44px height/width untuk mobile
- ✅ Padding responsif: `px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8`
- ✅ Icon sizing responsif: `size-5 sm:size-6`
- ✅ Mobile drawer tetap responsif

### 4. **Stat Cards (StatCard.tsx)**

- ✅ Sudah responsif dengan padding scaling
- ✅ Typography scaling: `text-xs sm:text-sm` untuk label
- ✅ Value sizing: `text-xl sm:text-2xl md:text-3xl`

### 5. **Chart Section (ChartSection.tsx)**

- ✅ Grid layout responsif: `grid-cols-1 lg:grid-cols-2`
- ✅ Padding scaling: `p-3 sm:p-4 md:p-6`
- ✅ Chart height responsif: `h-60 sm:h-72 md:h-80`
- ✅ Rounded corners responsive: `rounded-xl sm:rounded-2xl`

### 6. **Region Comparison**

- ✅ Card padding responsif: `p-3 sm:p-4 md:p-6`
- ✅ Grid untuk details: `grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3`
- ✅ Text scaling responsif

### 7. **Deforestation Map**

- ✅ Height responsif: `h-56 sm:h-72 md:h-96 lg:h-[450px]`
- ✅ Rounded corners: `rounded-lg sm:rounded-2xl`
- ✅ Empty state responsif

### 8. **Filter Panel**

- ✅ Sudah responsif dengan sizing `lg:w-80`
- ✅ Padding scaling: `p-4 sm:p-5`
- ✅ Sticky positioning hanya pada desktop

### 9. **Global CSS (globals.css)**

- ✅ Input font size 16px pada mobile (mencegah zoom iOS)
- ✅ Container responsive padding
- ✅ Touch target utilities

## Key Responsive Patterns

### Spacing Pattern

```jsx
// Mobile-first approach
<div className="p-4 sm:p-6 md:p-8">
```

### Typography Pattern

```jsx
// Size scaling
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
```

### Grid Pattern

```jsx
// Stacks pada mobile, multi-column pada desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

### Touch Target Pattern

```jsx
// Minimum 44px for mobile
<button className="min-h-11 min-w-11 p-2">
```

## Testing Responsiveness

Untuk memverifikasi responsiveness:

1. **Chrome DevTools**: Tekan F12 → Toggle Device Toolbar (Ctrl+Shift+M)
2. **Test breakpoints**:
   - 375px (iPhone)
   - 640px (Tablet)
   - 1024px (Laptop)
   - 1440px (Desktop)

3. **Test elements**:
   - Teks readability
   - Button touch targets
   - Spacing consistency
   - Image scaling
   - Navigation usability

## Viewport Meta Tag

Sudah dikonfigurasi di `app/layout.tsx`:

```tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
```

## Browser Support

Project mendukung:

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (iOS 12+)
- ✅ Android Browser

## Performance Tips

1. **Images**: Gunakan Next.js Image component dengan responsive sizes
2. **CSS**: Tailwind CSS sudah optimized untuk production
3. **Mobile First**: Semua styling dimulai dari mobile, extended ke desktop

## Kesimpulan

Project sekarang fully responsive dan mobile-friendly dengan:

- ✅ Proper touch targets (44px minimum)
- ✅ Scaling typography untuk readability
- ✅ Responsive spacing dan layout
- ✅ Optimized untuk semua device sizes
- ✅ Better UX pada mobile/tablet/desktop
