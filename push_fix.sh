#!/bin/bash
TOKEN=$(gh auth token)
git remote set-url origin "https://zonca:$TOKEN@github.com/zonca/zonca.dev.git"
git push origin gh-pages
