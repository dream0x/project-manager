#!/bin/bash

set -euo pipefail

# 引数チェック
if [ "$#" -ne 1 ]; then
    echo "引数を指定してください。"
    exit 1
fi

# 置換ファイル設定
target_dir="back/input"
output_dir="back/output"
mkdir -p "$output_dir"
rm -f "$output_dir"/*

# 置換文字設定
target_lower="resource"
target_upper="${target_lower^}"
replacement_lower="${1}"
replacement_upper="${replacement_lower^}"

# 置換してファイルを作成
for target_file_name in "$target_dir"/*; do
    # 入力ファイル名取得
    input_file_name="$(basename "$target_file_name")"
    # 出力ファイル名作成
    output_file_name="${input_file_name/$target_upper/$replacement_upper}"
    # 置換してファイル作成
    sed "s/$target_lower/$replacement_lower/g; s/$target_upper/$replacement_upper/g" \
        "$target_file_name" > "$output_dir/$output_file_name"
done
