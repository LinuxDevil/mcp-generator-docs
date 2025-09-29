---
title: Build a Weather API MCP (25 minutes)
description: Build a weather MCP server that fetches real weather data from APIs. Learn external API integration, error handling, and data transformation.
keywords: [weather API, external API, MCP tutorial, API integration, OpenWeatherMap, build along tutorial, intermediate MCP]
---

import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Build a Weather API MCP Server in 25 Minutes",
      "description": "Learn external API integration by building a practical weather MCP server",
      "totalTime": "PT25M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Node.js 18+"
        },
        {
          "@type": "HowToSupply",
          "name": "Free OpenWeatherMap API key"
        }
      ]
    })}
  </script>
  <meta name="tutorial-type" content="build-along" />
  <meta name="tutorial-difficulty" content="intermediate" />
  <meta name="tutorial-duration" content="25 minutes" />
</Head>

# 🌤️ Build a Weather API MCP (25 minutes)

:::info Great Second Tutorial
Perfect for learning external API integration! You'll build a weather service that fetches real data and handles API responses. This tutorial builds on concepts from the [Task Manager tutorial](./task-manager-mcp.md).
:::

## 🎯 What You'll Build

**Clear outcome:** By the end of this tutorial, you'll have a production-ready weather MCP server that fetches real weather data from OpenWeatherMap API, handles errors gracefully, formats responses beautifully, and integrates with Claude Desktop for natural language weather queries.

**Features you'll implement:**
- 🌡️ **Current weather** for any city worldwide with detailed conditions
- 🎨 **Rich formatting** with emojis and weather advice
- 🛡️ **Error handling** for network issues and invalid locations
- 🤖 **Claude Desktop integration** - natural language weather queries
- 📊 **Weather analytics** - Track weather data and patterns
- 🔧 **Extensible architecture** - Easy to add new weather features

**Time:** 25 minutes | **Difficulty:** Intermediate 🟡 | **Cost:** Free (API included)

## 📋 Prerequisites

:::note Before You Start
This tutorial assumes you've completed the [Task Manager tutorial](./task-manager-mcp.md) or have basic MCP knowledge.
:::

You'll need:
- ✅ **Node.js 18+** installed
- ✅ **Free OpenWeatherMap API key** ([Get one here](https://openweathermap.org/api))
- ✅ **Basic understanding** of APIs and JSON
- ✅ **15 minutes** to complete the Task Manager tutorial first (recommended)

## 🔑 Step 1: Get Your API Key (3 minutes)

First, let's get a free weather API key:

1. **Visit** [OpenWeatherMap](https://openweathermap.org/api)
2. **Click** "Sign Up" (it's free!)
3. **Verify** your email
4. **Go to** API Keys section
5. **Copy** your API key (looks like: `abc123def456ghi789`)

**✅ Save your API key** - you'll need it in Step 3!

:::tip Alternative APIs
You can also use:
- [WeatherAPI.com](https://www.weatherapi.com/) (free tier)
- [AccuWeather API](https://developer.accuweather.com/) (free tier)
- [Weather.gov](https://www.weather.gov/documentation/services-web-api) (US only, no key needed)
:::

## 🚀 Step 2: Create the Weather Project (3 minutes)

```bash
# Create the weather MCP server
npx mcp-server-generator weather-service \
  --description "Real-time weather data and forecasts with AI integration" \
  --transport both \
  --author "Weather Team"

# Navigate to the project  
cd weather-service
```

**✅ Checkpoint - You should see:**
```
✨ MCP Server project 'weather-service' created successfully!

📁 Generated structure with:
├── 8 powerful tools (data analysis, server monitoring)
├── 9 comprehensive resources  
├── 3 intelligent prompts
├── Both stdio and HTTP transports
└── TypeScript-first architecture
```

## 🛠️ Step 3: Add Weather Tools (5 minutes)

Let's add our weather-specific tools:

```bash
# Add current weather tool
npx mcp-server-generator add tool current-weather \
  --description "Get current weather conditions for any location"

# Add weather forecast tool
npx mcp-server-generator add tool weather-forecast \
  --description "Get 5-day weather forecast with detailed predictions"

# Add weather analytics tool
npx mcp-server-generator add tool weather-analytics \
  --description "Track weather data patterns and trends"

# Add weather formatter tool
npx mcp-server-generator add tool weather-formatter \
  --description "Format weather data with rich emojis and advice"
```

**✅ Checkpoint - Verify tools were created:**
```bash
npm run quick:test
```

**You should see your new tools listed:**
```
🛠️ Available Tools:
════════════════════════════════════════
✅ current-weather - Get current weather conditions
✅ weather-forecast - Get 5-day weather forecast  
✅ weather-analytics - Track weather patterns and trends
✅ weather-formatter - Rich formatting with emojis
... (plus 8 built-in tools)
```

## 🌐 Step 4: Add Weather Configuration (3 minutes)

Let's add configuration and resources for our weather service:

```bash
# Add weather configuration resource
npx mcp-server-generator add resource weather-config \
  --description "Weather API configuration and settings"

# Add location database resource
npx mcp-server-generator add resource location-database \
  --description "City and location data for weather lookups"
```

**Create environment configuration file:**

```bash
# Create .env file for API configuration
cat > .env << EOF
OPENWEATHER_API_KEY=your_api_key_here
WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
WEATHER_UNITS=metric
DEFAULT_LANGUAGE=en
EOF
```

**✅ Replace `your_api_key_here` with your actual API key from Step 1!**

## 💻 Step 5: Implement Current Weather Tool (8 minutes)

Now let's implement the current weather functionality. Edit `src/tools/current-weather-tool.ts`:

```typescript title="src/tools/current-weather-tool.ts"
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../utils/logger.js';

export class CurrentWeatherTool {
  constructor(private name: string = 'current-weather') {}

  register(server: McpServer): void {
    server.registerTool(
      this.name,
      {
        title: "Current Weather",
        description: "Get current weather conditions for any city or location",
        inputSchema: {
          location: z.string().describe("City name, or 'City, Country' (e.g., 'London, UK')"),
          units: z.enum(['metric', 'imperial', 'kelvin']).default('metric').describe("Temperature units"),
          includeDetails: z.boolean().default(true).describe("Include detailed weather information"),
          language: z.string().default('en').describe("Language for weather descriptions")
        }
      },
      async (args) => {
        try {
          logger.info(`Fetching weather for: ${args.location}`);
          
          const weatherData = await this.fetchCurrentWeather(args.location, args.units, args.language);
          const formattedReport = this.formatWeatherReport(weatherData, args.includeDetails);
          
          return {
            content: [{
              type: "text",
              text: formattedReport
            }]
          };
        } catch (error) {
          logger.error(`Weather fetch failed: ${error.message}`);
          return {
            content: [{
              type: "text",
              text: `❌ Unable to fetch weather for "${args.location}"\n\n` +
                    `Error: ${error.message}\n\n` +
                    `💡 Try:\n` +
                    `• Check the spelling of the location\n` +
                    `• Use format "City, Country" (e.g., "Paris, FR")\n` +
                    `• Verify your internet connection`
            }]
          };
        }
      }
    );
  }

  private async fetchCurrentWeather(location: string, units: string, language: string): Promise<any> {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('Weather API key not configured. Please set OPENWEATHER_API_KEY in .env file');
    }

    const baseUrl = process.env.WEATHER_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
    const url = `${baseUrl}/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=${units}&lang=${language}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Location "${location}" not found. Please check the spelling and try again.`);
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else {
        throw new Error(`Weather service error: ${response.statusText}`);
      }
    }

    return await response.json();
  }

  private formatWeatherReport(data: any, includeDetails: boolean): string {
    const location = `${data.name}, ${data.sys.country}`;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const condition = data.weather[0].description;
    const icon = this.getWeatherEmoji(data.weather[0].main);
    
    let report = `# 🌤️ Current Weather for ${location}\n\n`;
    report += `${icon} **${temp}°** - ${condition.charAt(0).toUpperCase() + condition.slice(1)}\n`;
    report += `🌡️ **Feels like:** ${feelsLike}°\n\n`;

    if (includeDetails) {
      report += `## 📊 Detailed Conditions\n\n`;
      report += `- **Humidity:** ${data.main.humidity}%\n`;
      report += `- **Pressure:** ${data.main.pressure} hPa\n`;
      report += `- **Visibility:** ${data.visibility ? (data.visibility / 1000).toFixed(1) + ' km' : 'N/A'}\n`;
      
      if (data.wind) {
        report += `- **Wind:** ${data.wind.speed} m/s`;
        if (data.wind.deg) {
          report += ` from ${this.getWindDirection(data.wind.deg)}`;
        }
        report += `\n`;
      }

      if (data.clouds) {
        report += `- **Cloudiness:** ${data.clouds.all}%\n`;
      }

      // Sunrise/sunset
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      report += `- **Sunrise:** 🌅 ${sunrise}\n`;
      report += `- **Sunset:** 🌇 ${sunset}\n\n`;

      // Weather advice
      report += this.getWeatherAdvice(data);
    }

    report += `\n*Last updated: ${new Date().toLocaleString()}*`;
    return report;
  }

  private getWeatherEmoji(condition: string): string {
    const emojiMap: Record<string, string> = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    };
    return emojiMap[condition] || '🌤️';
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  private getWeatherAdvice(data: any): string {
    let advice = `## 💡 Weather Advice\n\n`;
    
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].main;

    if (condition === 'Rain' || condition === 'Drizzle') {
      advice += `☔ Don't forget an umbrella!\n`;
    } else if (condition === 'Snow') {
      advice += `❄️ Bundle up and drive carefully!\n`;
    } else if (temp > 30) {
      advice += `🔥 Stay hydrated and seek shade!\n`;
    } else if (temp < 0) {
      advice += `🧊 Dress warmly and watch for ice!\n`;
    }

    if (humidity > 80) {
      advice += `💧 High humidity - it may feel warmer than it is!\n`;
    }

    if (data.wind && data.wind.speed > 10) {
      advice += `💨 Windy conditions - secure loose items!\n`;
    }

    return advice + `\n`;
  }
}
```

**✅ Install required dependencies:**
```bash
# Install node-fetch for API calls (if not already installed)
npm install node-fetch
npm install --save-dev @types/node-fetch
```

## 🧪 Step 6: Test Your Weather Tool (3 minutes)

Let's test our weather implementation:

```bash
# Build the project
npm run build

# Test the current weather tool
npm run inspector:cli -- --tool current-weather \
  --args '{"location": "London, UK", "units": "metric", "includeDetails": true}'
```

**✅ Expected output:**
```
# 🌤️ Current Weather for London, UK

☁️ **15°** - Partly cloudy
🌡️ **Feels like:** 13°

## 📊 Detailed Conditions

- **Humidity:** 72%
- **Pressure:** 1013 hPa
- **Visibility:** 10.0 km
- **Wind:** 3.2 m/s from SW
- **Cloudiness:** 40%
- **Sunrise:** 🌅 7:24:18 AM
- **Sunset:** 🌇 4:42:33 PM

## 💡 Weather Advice

💧 High humidity - it may feel warmer than it is!

*Last updated: 2/15/2024, 2:30:45 PM*
```

:::note Troubleshooting
**Problem:** "API key not configured"  
**Solution:** Make sure you added your API key to the `.env` file

**Problem:** "Location not found"  
**Solution:** Try format "City, Country" like "New York, US"

**Problem:** "fetch is not defined"  
**Solution:** Run `npm install node-fetch`
:::

## 🧪 Step 7: Test with MCP Inspector (2 minutes)

Launch the visual inspector to test interactively:

```bash
npm run inspector
```

**In the Inspector:**
1. Click **"current-weather"** tool
2. Enter a city: **"Tokyo, JP"**
3. Set units to **"metric"** 
4. Click **Execute**
5. See real weather data!

**Try different locations:**
- "Sydney, AU"
- "Cairo, EG" 
- "Vancouver, CA"
- Your hometown!

## 🤖 Step 8: Connect to Claude Desktop (2 minutes)

Add your weather service to Claude Desktop:

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "weather-service": {
      "command": "node", 
      "args": ["/absolute/path/to/weather-service/lib/server.js"],
      "env": {
        "NODE_ENV": "production",
        "OPENWEATHER_API_KEY": "your_actual_api_key_here"
      }
    }
  }
}
```

**Start the server:**
```bash
npm run build
npm run dev:stdio
```

**✅ Test in Claude Desktop:**
```
Hey Claude! What's the weather like in Paris right now?
```

Claude will use your weather tool to fetch real data and respond with current conditions!

## 🎉 Congratulations!

You've built a functional Weather API MCP server that fetches real weather data! 

### ✅ What You Accomplished

- 🌐 **External API Integration** - Connected to OpenWeatherMap API
- 🔑 **API Key Management** - Secure configuration with environment variables
- 🛡️ **Error Handling** - Graceful failures with helpful error messages
- 🎨 **Data Formatting** - Rich, formatted weather reports with emojis
- 🤖 **AI Integration** - Natural language weather queries through Claude

## 🚀 Next Challenges

Ready to extend your weather service?

### 🛠️ Add More Weather Tools
Edit the remaining tools using the same pattern:
- **`weather-forecast-tool.ts`** - 5-day forecasts
- **`weather-analytics-tool.ts`** - Weather pattern analysis  
- **`weather-formatter-tool.ts`** - Rich output formatting

### 🌟 Advanced Features
- **Weather maps** - Add radar/satellite imagery
- **Historical data** - Past weather lookup
- **Weather comparison** - Compare multiple cities
- **Custom notifications** - Weather alerts via email/SMS

### 📚 Learn More APIs
- **[File Organizer Tutorial](./file-organizer-mcp.md)** - File system operations
- **[Git Helper Tutorial](./git-helper-mcp.md)** - Git API integration
- **[Advanced Code Review](../tutorial-basics/advanced-code-review-mcp.md)** - Complex analysis APIs

## 💡 Key API Integration Concepts

This tutorial taught you:

1. **External API calls** with fetch and error handling
2. **Environment configuration** for API keys and settings
3. **Data transformation** from API responses to user-friendly formats
4. **Error handling patterns** for network and API failures
5. **Rate limiting awareness** (important for production)

## 🎯 Build Along Series Progress

Great job! You've completed:
- ✅ **[Task Manager MCP](./task-manager-mcp.md)** - Basic MCP concepts
- ✅ **[Weather API MCP](./weather-api-mcp.md)** - External API integration ← You're here!

**Continue with:**
- 🟡 **[File Organizer MCP](./file-organizer-mcp.md)** - File system operations (30 min)
- 🔴 **[Git Helper MCP](./git-helper-mcp.md)** - Advanced git workflows (35 min)

## 🌍 Real-World Applications

Your weather MCP could be used for:
- **Smart home automation** - Adjust thermostats based on weather
- **Travel planning** - Weather-aware itinerary suggestions
- **Agriculture** - Crop management and irrigation planning
- **Event planning** - Outdoor event weather monitoring
- **Sports/activities** - Weather-appropriate activity suggestions

---

:::tip Share Your Weather Service!
Built something cool with weather data? Share it in our [Community Showcase](https://github.com/LinuxDevil/Create-MCP/discussions/categories/showcase)!
:::

## ❓ Need Help?

- **🐛 API Issues:** Check your API key and internet connection
- **💬 Questions:** [GitHub Discussions](https://github.com/LinuxDevil/Create-MCP/discussions)  
- **📚 Docs:** [Full MCP Server Generator Documentation](../intro.md)

## 📦 Complete Source Code

**Full tutorial code available:**
- 📂 **[GitHub Repository](https://github.com/LinuxDevil/Create-MCP/tree/main/examples/tutorial-builds/weather-api)** - Complete working project
- 📋 **[Code Gist](https://gist.github.com/linuxdevil/weather-api-mcp-tutorial)** - Individual files
- 🔗 **[Live Demo](https://github.com/LinuxDevil/Create-MCP/tree/main/examples/tutorial-builds/weather-api/demo)** - Screenshots of working weather data

**What's included:**
- ✅ Complete `weather-service` project with current weather tool
- ✅ `package-lock.json` with pinned versions (node-fetch@3.3.0, etc.)
- ✅ `.env.example` template for API configuration
- ✅ Test cases with mock weather data
- ✅ Error handling examples and edge cases
- ✅ Claude Desktop configuration examples

## 📄 License & Usage

**Code License:**
- ✅ **MIT License** - Free to use, modify, and distribute
- ✅ **Commercial use allowed** - Build weather apps or services
- ✅ **No attribution required** but appreciated

**API Terms:**
- ✅ **OpenWeatherMap**: Free tier (1000 calls/day), paid plans available
- ✅ **Rate limits**: 60 calls/minute on free tier
- ✅ **Commercial use**: Allowed under OpenWeatherMap terms

**Data Usage:**
- ✅ **Weather data**: Provided by OpenWeatherMap under their license
- ✅ **Personal use**: Store weather data as needed for your app
- ✅ **Privacy**: No user data collected, API key stored locally only

## 🔒 Security & API Best Practices

**API Key Security:**
- ✅ **Never commit API keys** - Use `.env` files (included in `.gitignore`)
- ✅ **Rotate keys regularly** - OpenWeatherMap allows key regeneration
- ✅ **Monitor usage** - Check API dashboard for unexpected usage

**Rate Limiting:**
- ✅ **Respect limits** - Free tier: 1000 calls/day, 60/minute
- ✅ **Cache responses** - Weather changes slowly, cache for 10+ minutes
- ✅ **Handle failures** - Graceful degradation when API is down

## 🔄 Maintenance & Updates

**API Version Stability:**
- ✅ **OpenWeatherMap API v2.5** - Stable, no breaking changes planned
- ✅ **Tested compatibility** - Works with current API as of 2024
- ✅ **Migration path** - If API changes, we'll update tutorial

**Dependencies:**
- **node-fetch**: 3.3.0+ (ESM compatible)
- **@types/node-fetch**: 2.6.0+ for TypeScript support
- **MCP SDK**: Latest version, updated monthly

Ready for your next API integration challenge? 🚀
