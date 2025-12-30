You are viewing the source code of the application. If you want to open the app and play, [click here instead](yamb.silver-volt4.cz).

# Yamb

A point tracking web app for the Yamb dice game written in JavaScript & Svelte.

It is merely a companion and only offers an interface to write your points into. It also calculates the total points for you automatically. It works best when all players have their own phone to use, but the app also offers support for multiple game profiles, just in case. 

## Build instructions

This repository contains a CI workflow for building that you can use to build the website. The rough idea, however, is:

1. Clone the repository and install NPM dependencies.
2. Run `npm run fetch-assets` to download the font used in the app from Google fonts.
3. Either run `npm run dev` for testing, or run `npm run build` to build.