#!/bin/bash

set -euo pipefail

# 引数チェック
if [ "$#" -ne 1 ]; then
    echo "引数を指定してください。"
    exit 1
fi

# 置換ファイル設定
target_dir="front/input"
output_dir="front/output/$1"

# 以前の出力ファイル削除
mkdir -p "$output_dir"
rm -rf "$output_dir"/*

# 置換文字設定
target_lower="resource"
target_upper="${target_lower^}"
replacement_lower="${1}"
replacement_upper="${replacement_lower^}"

# 置換してファイルを作成
find "$target_dir" -type f -print0 | while IFS= read -r -d '' target_file_path; do
    # ファイル名取得
    target_file_name="${target_file_path#"$target_dir"/}"
    output_file_name="${target_file_name//$target_upper/$replacement_upper}"

    # 出力フォルダ作成
    output_path="$output_dir/$output_file_name"
    mkdir -p "$(dirname "$output_path")"

    # 置換してファイル作成
    sed "s/$target_lower/$replacement_lower/g; s/$target_upper/$replacement_upper/g" \
        "$target_file_path" > "$output_path"
done
