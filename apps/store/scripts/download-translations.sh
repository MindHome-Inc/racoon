#!/usr/bin/env bash
set -eou pipefail

source .env.local

echo "Attempting to download latest translations from Lokalise..."

if [ -z "${LOKALISE_TOKEN:-}" ]; then
  printf "Environment variable LOKALISE_TOKEN is unset. Enter Lokalise API token: "
  read -r token || exit 1
else
  echo "Using environment variable LOKALISE_TOKEN for Lokalise API token"
  token="$LOKALISE_TOKEN"
fi

if [ -z "$token" ]; then
  echo "No Lokalise API token provided"
  exit 1
fi

if ! command -v lokalise2 &> /dev/null
then
    echo "lokalise2 CLI could not be found, please install:"
    echo "https://github.com/lokalise/lokalise-cli-2-go#installation"
    exit
fi

lokalise2 \
  -t "$token" \
  --project-id 743091915e9da969db9340.20943733 \
  file download \
  --format json \
  --export-sort a_z \
  --export-empty-as skip \
  --add-newline-eof \
  --replace-breaks=false \
  --directory-prefix 'public/locales/%LANG_ISO%' \
  --placeholder-format i18n \
  --plural-format i18next \
  --include-tags hedvig-com \
  --indentation 2sp \
  --filter-langs 'en,da_DK,sv_SE,nb_NO' \
  --language-mapping '[
    {"original_language_iso": "en","custom_language_iso": "en"},
    {"original_language_iso": "da_DK","custom_language_iso": "dk"},
    {"original_language_iso": "sv_SE","custom_language_iso": "sv-se"},
    {"original_language_iso": "nb_NO","custom_language_iso": "no"}
  ]'

# Convert plural forms to i18next v4 format (https://www.i18next.com/misc/json-format)
yarn dlx i18next-v4-format-converter public/locales