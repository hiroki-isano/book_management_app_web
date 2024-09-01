from pdf2image import convert_from_path
import PyPDF2

# 使用例 
# def pdf_to_image(pdf_path, output_folder, fmt='jpg', dpi=300):
#     """
#     PDFファイルを画像に変換する関数

#     Args:
#         pdf_path (str): 変換したいPDFファイルのパス
#         output_folder (str): 出力先のフォルダパス
#         fmt (str, optional): 出力画像の形式 (jpg, pngなど). Defaults to 'jpg'.
#         dpi (int, optional): 出力画像の解像度. Defaults to 300.
#     """

#     pages = convert_from_path(pdf_path, dpi=dpi)
#     for i, page in enumerate(pages):
#         page.save(f'{output_folder}/output_{i+1}.{fmt}', fmt)

# # 使用例
# # /book/なっとく！関数型プログラミング.pdf
# pdf_path = "/book/test2.pdf"
# 
# pdf_to_image(pdf_path, output_folder,"png")

output_folder = "/book/img/2"
path = "/book/test2.pdf"
reader=PyPDF2.PdfReader(str(path))
page_count = len(reader.pages)

page_range = 50

images = []
for page in range(1, page_count, page_range):
    images = convert_from_path(path,dpi=400,fmt='jpeg',first_page=page,last_page=min(page + page_range - 1, page_count),)
    # images = convert_from_path(path,output_folder='/book/img/2',dpi=400,fmt='jpeg',first_page=page,last_page=min(page + page_range - 1, page_count),)
    for i, image in enumerate(images):
        image.save(f"{output_folder}/page_{page + i}.jpeg")