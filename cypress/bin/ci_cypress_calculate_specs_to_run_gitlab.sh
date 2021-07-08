#!/bin/bash

set -e

allSpecs=$(find cypress/integration/ -name "*.spec.ts" | sort -n)
specCount=$(echo "$allSpecs" | wc -l)

if [ "$CI_NODE_INDEX" == "" ]; then
  CY_SPECS=$(echo "$allSpecs" | paste -sd "," -)
else
  specPerRunner=$((specCount / CI_NODE_TOTAL))

  if (( specPerRunner < 1 )); then
    specPerRunner=1
  fi

  takeAmount="$specPerRunner"

  if [ "$CI_NODE_INDEX" == "$((CI_NODE_TOTAL))" ]; then
    takeAmount=$((specPerRunner * 2))
  fi

  specs=$(echo "$allSpecs" | tail -n +$((specPerRunner * (CI_NODE_INDEX - 1) + 1)) | head -$takeAmount )
  CY_SPECS=$(echo "$specs" | paste -sd "," -)
fi

echo $CY_SPECS
