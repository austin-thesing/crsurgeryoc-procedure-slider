# Procedure Slider

A responsive procedure slider built with Swiper.js and designed to work seamlessly with Webflow collection lists.

## Features

- 🚀 **Modern Build System**: Uses Bun for fast bundling
- 📱 **Responsive Design**: Adapts to mobile, tablet, and desktop
- 🎯 **Webflow Integration**: Works with your existing Webflow CMS structure
- 🎨 **Minimal CSS**: Only essential styles - preserves your Webflow styling
- ⚡ **Auto-rebuild**: Watch mode for development
- 🛠️ **Customizable**: Easy to modify styles and behavior via CSS custom properties
- ♿ **Accessible**: Built with accessibility in mind

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Build Production Files

```bash
bun run build
```

### 3. Development Mode (Watch)

```bash
bun run dev
```

## File Structure

```
procedure-slider/
├── src/
│   └── procedure-slider.js     # Source JavaScript with Swiper imports
├── dist/                       # Production-ready files
│   ├── procedure-slider.js     # Bundled JavaScript (93KB)
│   ├── procedure-slider.css    # Styles
│   ├── procedure-slider.js.map # Source map
│   └── test.html              # Test page
├── procedure-slider.css        # Source CSS styles
├── build.js                   # Bun build configuration
└── package.json               # Dependencies and scripts
```

## Webflow Integration

### HTML Structure

Your Webflow collection should have this structure:

```html
<div class="procedure-slider-wrap">
  <!-- CMS List -->
  <div class="procedure-slide-outer">
    <!-- CMS List Item -->
    <div class="procedure-slide">
      <!-- Your Component -->
      <!-- Your content here -->
    </div>
  </div>
  <!-- More slides... -->
</div>
```

### Add to Webflow

1. **Upload the files** to your Webflow hosting or CDN
2. **Add CSS** to your site's custom code (Head):

```html
<link rel="stylesheet" href="/path/to/procedure-slider.css" />
```

3. **Add JavaScript** before closing `</body>`:

```html
<script src="/path/to/procedure-slider.js"></script>
```

> **Important**: The CSS is minimal and only includes essential Swiper functionality. Your existing Webflow flex/grid styling on `.procedure-slider-wrap` will be preserved! The CSS only applies styles when Swiper is initialized.

### Optional Navigation Elements

Add these elements anywhere in your page for navigation:

```html
<div class="swiper-button-next"></div>
<div class="swiper-button-prev"></div>
<div class="swiper-pagination"></div>
```

## Configuration

### Responsive Breakpoints

- **Mobile** (< 480px): 1 slide
- **Tablet** (768px): 2 slides
- **Desktop** (992px): 3 slides
- **Large Desktop** (1200px+): 3 slides

### Customization

#### JavaScript Configuration

Edit `src/procedure-slider.js` to modify:

- Slide counts per breakpoint
- Autoplay timing
- Transition effects
- Navigation options

After making changes, run `bun run build` to update the production files.

#### CSS Styling with Custom Properties

Customize navigation and pagination appearance using CSS custom properties in your Webflow custom CSS:

```css
:root {
  --swiper-navigation-size: 50px;
  --swiper-navigation-color: #ffffff;
  --swiper-pagination-color: #007aff;
  --swiper-pagination-bullet-size: 10px;
  --swiper-navigation-sides-offset: 20px;
}
```

This approach keeps your styling in Webflow while allowing easy customization!

## Development

### Watch Mode

```bash
bun run dev
```

This will watch for changes and automatically rebuild the files.

### Testing

Open `dist/test.html` in your browser to test the slider locally.

### Build Commands

- `bun run build` - Build production files
- `bun run dev` - Watch mode for development
- `bun run clean` - Clean dist folder

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- **Swiper.js 11.x** - Modern slider library
- **Bun** - Fast JavaScript runtime and bundler

## License

MIT License - feel free to use in your projects!
