#include <iostream>
#include <filesystem>
#include <unordered_map>
#include <vector>

namespace fs = std::filesystem;
using namespace std;

int main() {

    string folderPath;

    cout << "Enter Folder Path: ";
    cin >> folderPath;

    unordered_map<uintmax_t, vector<string>> fileMap;

    for (const auto & entry : fs::recursive_directory_iterator(folderPath)) {

        if (fs::is_regular_file(entry.path())) {

            uintmax_t size = fs::file_size(entry.path());

            fileMap[size].push_back(entry.path().string());
        }
    }

    cout << "\nDuplicate Files:\n";

    for (auto & pair : fileMap) {

        if (pair.second.size() > 1) {

            cout << "\nPossible Duplicates (Size: " << pair.first << " bytes)\n";

            for (string file : pair.second) {
                cout << file << endl;
            }
        }
    }

    return 0;
}